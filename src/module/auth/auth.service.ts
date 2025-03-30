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



@Injectable()
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

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = this.userRepository.create({
      ...(username && { username }),
      ...(email && { email }),
      ...(phone && { phone }),
      password: hashedPassword,
      role:Roles.User,
    });
    await this.userRepository.save(user)

    const token = this.tokenService.accessToken({ userId: user.id })

    return this.sendResponse(res, token);


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

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new UnauthorizedException(" username or password is not valid")
    }

    const token = this.tokenService.accessToken({ userId: user.id })

    return this.sendResponse(res, token);

  }

  async sendResponse(res: Response, token: string) {
    res.cookie(CookieKeys.accessToken, token, {
      httpOnly: true,
      expires: new Date(Date.now() + (1000 * 60 * 2))
    })
    res.json({ token })
  }

}
