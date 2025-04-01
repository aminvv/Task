import { BadRequestException, Inject, Injectable, NotFoundException, Scope, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import {  Request } from 'express';
import { ProfileDto, UpdateAvatarProfile } from './dto/profile.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as fs from 'fs';



@Injectable({scope:Scope.REQUEST})
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity) private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}


  async createProfile(file: Express.Multer.File,profileDto: ProfileDto) {
    const user = this.request?.user

    if (file) {
      profileDto.avatar = file.path?.slice(7);
    }
  
    if (!user) {
      throw new BadRequestException('User is not authenticated');
    }

    const profileExist = await this.profileRepository.findOneBy({ userId: user.id })
    if (profileExist) {
      throw new BadRequestException('A profile already exists');
    }

    
    const profile = this.profileRepository.create({
      firstName: profileDto.firstName, 
      lastName: profileDto.lastName,
      email: profileDto.email,
      avatar: profileDto.avatar,
      userId: user.id,
    });
  
    const savedProfile = await this.profileRepository.save(profile);
  
    await this.userRepository.update(user.id, { profileId: savedProfile.id })
  
    return {
      message:" create profile successfully"
    }
  }


  
  async updateAvatar(file: Express.Multer.File, updateAvatarProfile: UpdateAvatarProfile) {
    const user = this.request?.user;
    const profile = await this.profileRepository.findOne({ where: { userId: user?.id } })
  
    if (!profile) {
      throw new NotFoundException('Profile not found')
    }
  
    if (file && file.path) {
      updateAvatarProfile.avatar = file.path.slice(7)
    } else {
      throw new BadRequestException('No file uploaded or file path is invalid')
    }
  
    profile.avatar = updateAvatarProfile.avatar
    await this.profileRepository.save(profile)
  
    return { message: 'Avatar updated successfully', avatar: profile.avatar }
  }
  

  async updateUserProfile(UpdateProfileDto: UpdateProfileDto) {
    const user = this.request?.user;
    if (!user) {
      throw new UnauthorizedException('User is not authenticated');
    }


    const existingUser = await this.userRepository.findOne({ where: { id: user.id } })
    if (!existingUser) {
      throw new NotFoundException('User not found')
    }

    const profile = await this.profileRepository.findOne({ where: { userId: user.id } })
    if (!profile) {
      throw new BadRequestException("profile not found")
    }
 
    if (UpdateProfileDto.password) {
      const hashedPassword = await bcrypt.hash(UpdateProfileDto.password, 12);
      existingUser.password = hashedPassword;
    }
    if (UpdateProfileDto.email) existingUser.email = UpdateProfileDto.email
    if (UpdateProfileDto.email) profile.email = UpdateProfileDto.email
    if (UpdateProfileDto.phone) existingUser.phone = UpdateProfileDto.phone
    

    if (UpdateProfileDto.firstName) profile.firstName = UpdateProfileDto.firstName
    if (UpdateProfileDto.lastName) profile.lastName = UpdateProfileDto.lastName
    if (UpdateProfileDto.avatar) profile.avatar = UpdateProfileDto.avatar


    await this.userRepository.save(existingUser)
    await this.profileRepository.save(profile)

    return { message: 'Profile updated successfully', profile, user: existingUser }
  }



  async downloadAvatar() {
    const user = this.request?.user
    const profile = await this.profileRepository.findOne({ where: { userId: user?.id } })
  
    if (!profile) {
      throw new NotFoundException('profile not found')
    }
  
    if (!profile.avatar) {
      throw new NotFoundException('pic not found')
    }
  
    const filePath = path.join(process.cwd(), 'public', profile.avatar)
  
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('file not found');
    }
  
    return filePath
  }

  
}






