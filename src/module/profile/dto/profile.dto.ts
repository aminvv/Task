import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';
import { ToNull } from 'src/common/decorators/toNull.decorator';

export class ProfileDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @ToNull()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ nullable: true  ,format:"binary" })
  @IsOptional()
  @IsString()
  avatar?: string;
}


export class UpdateAvatarProfile{
  @ApiPropertyOptional({ nullable: true  ,format:"binary" })
  @IsOptional()
  @IsString()
  avatar?: string;
}