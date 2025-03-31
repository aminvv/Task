import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { swaggerConsumes } from 'src/common/enums/swaggerConsumes.enum';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { CookieKeys } from 'src/common/enums/cookie.enum';
import { AuthGuard } from './guard/auth.guard';


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



  @Post('refresh')
refreshToken(@Res() res: Response, @Req() req: Request) {
  const refreshToken = req.cookies[CookieKeys.refreshToken];
  return this.authService.refreshToken(res, refreshToken);
}

@UseGuards(AuthGuard)
@ApiBearerAuth('Authorization') 
@Post('logout')
logout(@Res() res: Response) {
  return this.authService.logout(res);
}

}
