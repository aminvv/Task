import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ChangeRoleDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {

constructor(
  @InjectRepository(UserEntity) private userRepository:Repository<UserEntity>
){}



  findAll() {
    return this.userRepository.find()
  }


  async updateUser(id: number, updateDto: UpdateUserDto) {
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
