import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ChangeRoleDto,  UserDto } from './dto/user.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { paginationGenerator, paginationSolver } from 'src/common/utils/pagination.util';
import { paginationDto } from 'src/common/dtos/pagination.dto';


@Injectable({scope:Scope.REQUEST})
export class UserService {

constructor(
  @InjectRepository(UserEntity) private userRepository:Repository<UserEntity>,
   @Inject(REQUEST) private readonly request: Request,
){}



async findAll(pagination: paginationDto) {
  const { limit, page, skip } = paginationSolver(pagination);

  const [users, count] = await this.userRepository.findAndCount({
      relations: ["profile"],
      skip,
      take: limit,
  });

  return {
      data: users,
      pagination: paginationGenerator(count, page, limit),
  };
}


  async updateUser(id: number, updateDto: UserDto) {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) throw new NotFoundException('User not found')

    Object.assign(user, updateDto);
    return this.userRepository.save(user)
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['tasks'] });
    if (!user) throw new NotFoundException('User not found');
    await this.userRepository.remove(user);
    return{
      message:' delete successfully'
    }
  }





  async changeUserRole(id: number, changeRoleDto: ChangeRoleDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    user.role = changeRoleDto.role;
    return this.userRepository.save(user);
  }




}
