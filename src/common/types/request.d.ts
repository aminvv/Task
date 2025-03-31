import { UserEntity } from "src/module/user/entities/user.entity";


declare global{
    namespace Express{
        interface Request{
            user?:UserEntity
        }
    }
}
export interface CustomRequest extends Request {
    user?: AccessTokenPayload; 
    cookies: { [key in CookieKeys]?: string };
  }
 
 export{}