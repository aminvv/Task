import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
   imports:[TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService,TokenService,JwtService],
})
export class AuthModule {}
