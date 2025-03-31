import { BadRequestException, Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { TokenService } from './token.service';
import { REQUEST } from '@nestjs/core';
import { Request, Response } from 'express';
import { CookieKeys } from 'src/common/enums/cookie.enum';
import { Roles } from 'src/common/enums/role.enums';



@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private tokenService: TokenService
  ) { }







  async signUp(signUpDto: SignupDto, res: Response) {
    const { email, password, phone, username } = signUpDto


    if (!email && !phone && !username) {
      throw new BadRequestException('You must provide either email, phone, or username')
    }
    const query = this.userRepository.createQueryBuilder('user');
    if (email) query.orWhere('user.email = :email', { email });
    if (phone) query.orWhere('user.phone = :phone', { phone });
    if (username) query.orWhere('user.username = :username', { username });

    const existUser = await query.getOne();
    if (existUser) {
      throw new BadRequestException('User with provided info already exists')
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if (!passwordRegex.test(password)) {
      throw new BadRequestException('Password is too weak')
    }

    const hashedPassword = await this.hashed(password)
    const user = this.userRepository.create({
      ...(username && { username }),
      ...(email && { email }),
      ...(phone && { phone }),
      password: hashedPassword,
      role: Roles.User,
    });
    await this.userRepository.save(user)

    const accessToken = this.tokenService.accessToken({ id: user.id, role: user.role })
    const refreshToken = this.tokenService.refreshToken({ id: user.id, role: user.role })
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(user.id, { refreshToken:hashedRefreshToken });
    return this.sendResponse(res, accessToken, refreshToken, user.id);


  }





  async login(loginDto: LoginDto, res: Response) {
    const { password, usernameOrEmailOrPhone } = loginDto

    const whereCondition = [
      { username: usernameOrEmailOrPhone },
      { email: usernameOrEmailOrPhone },
      { phone: usernameOrEmailOrPhone },
    ];

    const user = await this.userRepository.findOne({
      where: whereCondition.filter(condition => Object.values(condition)[0]),
    });

    if (!user) {
      throw new BadRequestException("userNotFound")
    }

    const isMatch = await this.compare(password,user.password)
    if (!isMatch) {
      throw new UnauthorizedException(" username or password is not valid")
    }

    const accessToken = this.tokenService.accessToken({ id: user.id, role: user.role })
    const refreshToken = this.tokenService.refreshToken({ id: user.id, role: user.role })

    return this.sendResponse(res, accessToken, refreshToken, user.id);

  }




async hashed(data:string){
   return await bcrypt.hash(data, 12);
}

async compare(data:string,userData:string){
   return await bcrypt.compare(data, userData);
}





  async sendResponse(res: Response, accessToken: string, refreshToken: string, userId: number) {
    const hashedRefreshToken =await this.hashed(refreshToken)
    await this.userRepository.update(userId, { refreshToken:hashedRefreshToken });

    res.cookie(CookieKeys.accessToken, accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
    });


    res.cookie(CookieKeys.refreshToken, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    res.json({ accessToken });
  }





  async refreshToken(res: Response, refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token is required")
    }
  
    const payload = this.tokenService.verifyRefreshToken(refreshToken);
    const user = await this.userRepository.findOne({ where: { id: payload.userId } })
  
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException("Invalid refresh token")
    }
  
    const isMatch = await this.compare(refreshToken,user.refreshToken)
    if (!isMatch) {
      throw new UnauthorizedException("Invalid refresh token")
    }
  
    const accessToken = this.tokenService.accessToken({ id: user.id, role: user.role })
    const newRefreshToken = this.tokenService.refreshToken({ id: user.id, role: user.role })
  
    return this.sendResponse(res, accessToken, newRefreshToken, user.id)
  }
  



  async logout(res: Response) {
    console.log("Request User: ", this.request.user);
    const user = this.request.user
    
    if (!user) {
      throw new UnauthorizedException("User not authenticated");
    }
  
    const existingUser = await this.userRepository.findOne({ where: { id: user.id } });
  
    if (!existingUser) {
      throw new UnauthorizedException("User not found");
    }
  
    await this.userRepository.update(user.id, { refreshToken: null });
  
    res.clearCookie(CookieKeys.accessToken);
    res.clearCookie(CookieKeys.refreshToken);
  
    res.json({ message: "Logged out successfully" });
  }
  
  


}
