import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskEntity } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [AuthModule,TypeOrmModule.forFeature([TaskEntity,UserEntity])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
