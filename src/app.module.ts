import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmConfig } from './config/typeOrm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:join(process.cwd(), '.env'),isGlobal:true}),
    TypeOrmModule.forRoot(TypeOrmConfig())
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
