import { Injectable, NotFoundException, BadRequestException, Scope, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDto } from './dto/create-task.dto';
import { UserEntity } from '../user/entities/user.entity';
import { paginationDto } from 'src/common/dtos/pagination.dto';
import { paginationGenerator, paginationSolver } from 'src/common/utils/pagination.util';

@Injectable({ scope: Scope.REQUEST })
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity) private readonly taskRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async createTask(createTaskDto: TaskDto) {
    const user = this.request?.user;
    if (!user) {
      throw new BadRequestException('login try again');
    }

    const task = this.taskRepository.create({
      name: createTaskDto.name,
      description: createTaskDto.description,
      userId: user.id,
    });

    const savedTask = await this.taskRepository.save(task)
    await this.userRepository.update(user.id, { taskId: savedTask.id })
    return { message: 'task create successfully', task: savedTask } 
  }

  async updateTask(taskId: number, updateTaskDto: UpdateTaskDto) {
    const user = this.request?.user
    const task = await this.taskRepository.findOne({ where: { id: taskId, userId: user?.id } })
 
    if (!task) {
      throw new NotFoundException('task not found')
    }

    task.name = updateTaskDto.name || task.name
    task.description = updateTaskDto.description || task.description

    const updatedTask = await this.taskRepository.save(task)
    return { message: 'task update successfully', task: updatedTask }
  }

  async deleteTask(taskId: number) {
    const user = this.request?.user
    const task = await this.taskRepository.findOne({ where: { id: taskId, userId: user?.id } })

    if (!task) {
      throw new NotFoundException('task not found')
    }

    await this.taskRepository.remove(task)
    return { message: 'task deleted successfully' }
  }


  async getTask(taskId: number) {
    const user = this.request?.user
    const task = await this.taskRepository.findOne({ where: { id: taskId, userId: user?.id } })

    if (!task) {
      throw new NotFoundException('task not found')
    }

    return task
  }


  async getAllTasks(pagination: paginationDto) {
    const { limit, page, skip } = paginationSolver(pagination);
    const user = this.request?.user;

    const [tasks, count] = await this.taskRepository.findAndCount({
        where: { userId: user?.id },
        relations: ["user", "user.profile"],
        skip,
        take: limit,
    });

    return {
        data: tasks,
        pagination: paginationGenerator(count, page, limit),
    };
}
}