import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { isJWT } from "class-validator";
import { Request } from "express";
import { TokenService } from "../token.service";


@Injectable()
 export class AuthGuard implements CanActivate{
    
    constructor(
        private tokenService:TokenService
    ){}

    async canActivate(context: ExecutionContext) {
        const request=context.switchToHttp().getRequest<Request>()
        const token=this.ExtractToken(request)
         request.user=this.tokenService.verifyToken(token)
        return true
    }


    protected ExtractToken(request:Request){
        const{authorization}=request.headers
         if(!authorization|| authorization.trim()==""){
            throw new UnauthorizedException("tryAgain login")
         }
         const[bearer,token]=authorization.split(" ")
         if(bearer?.toLowerCase()!=="bearer" ||!token || !isJWT(token)){
            throw new UnauthorizedException("tryAgain login")
         }
         return token
    }
 }