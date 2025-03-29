import { ApiProperty } from "@nestjs/swagger";

 export class LoginDto{
    @ApiProperty()
    usernameOrEmailOrPhone: string;

    @ApiProperty()
    password: string;
  
 }