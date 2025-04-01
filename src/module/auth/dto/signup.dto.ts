import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEmail, Matches, IsString, MinLength } from 'class-validator';
import { ToNull } from 'src/common/decorators/toNull.decorator';

export class SignupDto {
  @ApiPropertyOptional({ description: 'Email address' })
  @IsOptional()
  @ToNull()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Phone number (Iran format)' })
  @IsOptional()
  @Matches(/^09\d{9}$/, { message: 'Phone number must be a valid Iranian number' })
  phone?: string;

  @ApiPropertyOptional({ description: 'username' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ description: 'Password (at least 8 characters with uppercase & lowercase)' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message: 'Password too weak',
  })
  password: string;
}