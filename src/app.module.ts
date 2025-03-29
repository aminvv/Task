import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmConfig } from './config/typeOrm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { TokenService } from './module/auth/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:join(process.cwd(), '.env'),isGlobal:true}),
    TypeOrmModule.forRoot(TypeOrmConfig()),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
