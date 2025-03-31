import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CookiePayload } from './enums/payload';



@Injectable()
export class TokenService {
  constructor(
    private jwtService:JwtService
  ){}

   accessToken(payload:CookiePayload){
    const accessToken=this.jwtService.sign(payload,{
      secret:process.env.ACCESS_TOKEN_SECRET,
      expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN,
    })
    return accessToken
  }


   refreshToken(payload:CookiePayload){
    const refreshToken=this.jwtService.sign(payload,{
      secret:process.env.REFRESH_TOKEN_SECRET,
      expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN,
    })
    return refreshToken
  }
 


  verifyToken(token:string){
try {
  return this.jwtService.verify(token,{
    secret:process.env.ACCESS_TOKEN_SECRET
  })
} catch (error) {
  throw new UnauthorizedException("TryAgain login")
}
  }


  verifyRefreshToken(token:string){
try {
  return this.jwtService.verify(token,{
    secret:process.env.REFRESH_TOKEN_SECRET
  })
} catch (error) {
  throw new UnauthorizedException("Invalid refresh token")
}
  }


}
