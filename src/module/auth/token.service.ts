import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CookiePayload } from './enums/payload';



@Injectable()
export class TokenService {
  constructor(
    private jwtService:JwtService
  ){}

   accessToken(payload:CookiePayload){
    const token=this.jwtService.sign(payload,{
      secret:process.env.ACCESS_TOKEN_SECRET,
      expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN,
    })
    return token
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


}
