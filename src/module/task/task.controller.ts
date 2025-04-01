import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { swaggerConsumes } from 'src/common/enums/swaggerConsumes.enum';
import { pagination } from 'src/common/decorators/pagination.decorator';
import { paginationDto } from 'src/common/dtos/pagination.dto';

@Controller('tasks')
@ApiBearerAuth('Authorization') 
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  @Post()
  async createTask(@Body() createTaskDto: TaskDto) {
    return this.taskService.createTask(createTaskDto)
  }

  @UseGuards(AuthGuard)
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  @Put(':id')
  async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(id, updateTaskDto)
  }

  @UseGuards(AuthGuard)
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id)
  }

  @UseGuards(AuthGuard)
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  @Get(':id')
  async getTask(@Param('id') id: number) {
    return this.taskService.getTask(id)
  }

  @UseGuards(AuthGuard)
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  @pagination()
  @Get()
  async getAllTasks(@Query() pagination: paginationDto) {
      return this.taskService.getAllTasks(pagination);
  }
}