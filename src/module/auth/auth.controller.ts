import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { swaggerConsumes } from 'src/common/enums/swaggerConsumes.enum';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';


@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  signUp(@Body() signUpDto: SignupDto ,@Res() res: Response) {
    return this.authService.signUp(signUpDto,res);
  }


  @Post('login')
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  login(@Body() loginDto: LoginDto,@Res() res: Response) {
    return this.authService.login(loginDto ,res);
  }

}
