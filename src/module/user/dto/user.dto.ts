import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { isEmail, IsEmail,  IsEnum, IsOptional, IsString } from 'class-validator';
import { ToNull } from 'src/common/decorators/toNull.decorator';
import { Roles } from 'src/common/enums/role.enums';


  export class UserDto {
    @ApiProperty()
    @ToNull()
    @IsOptional()
    email?: string;
  
    @ApiPropertyOptional()
    @ToNull()
    @IsOptional()
    phone?: string;
  
    @ApiPropertyOptional()
    @ToNull()
    @IsOptional()
    username?: string;
    
}

export class ChangeRoleDto {
  @ApiProperty({enum:Roles})
  @IsEnum(Roles)
  role: Roles;
}