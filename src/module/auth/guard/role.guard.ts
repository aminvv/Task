import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { Roles } from "src/common/enums/role.enums";
import { ROLE_KEY } from "src/common/decorators/role.decorator";


@Injectable()
 export class RoleGuard implements CanActivate{
    
    constructor(
        private reflector:Reflector
    ){}

    async canActivate(context: ExecutionContext) {
         const requiredRoles= this.reflector.getAllAndOverride<Roles[]>(ROLE_KEY,[
            context.getHandler(),
            context.getClass()
         ])
         if(!requiredRoles || requiredRoles.length ==0)return true
         const request:Request= context.switchToHttp().getRequest<Request>()
         const user=request.user
         const userRole=user?.role ??Roles.User
         if(user?.role ===Roles.Admin) return true
         if(requiredRoles.includes(userRole))return true
         throw new ForbiddenException()
    }


 }