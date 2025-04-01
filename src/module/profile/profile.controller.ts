import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, UseInterceptors, Res } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ProfileDto, UpdateAvatarProfile,  } from './dto/profile.dto';
import { swaggerConsumes } from 'src/common/enums/swaggerConsumes.enum';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {  FileInterceptor } from '@nestjs/platform-express';
import { multerStorage } from 'src/common/utils/multer.util';
import { uploadedOptionalFile } from 'src/common/decorators/upload-files.decorator';
import { Response } from 'express';


@Controller('profile')
@ApiBearerAuth('Authorization') 
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}




  @UseGuards(AuthGuard)
  @ApiConsumes(swaggerConsumes.MultiPartData)
  @Post('createProfile')
  @UseInterceptors(FileInterceptor("avatar", { storage: multerStorage("avatar") }))
  async createProfile(@uploadedOptionalFile() file: Express.Multer.File,@Body() profileDto: ProfileDto) {
    return this.profileService.createProfile(file,profileDto);
  }


  @UseGuards(AuthGuard)
  @ApiConsumes(swaggerConsumes.MultiPartData)
  @Post('updateAvatarProfile')
  @UseInterceptors(FileInterceptor("avatar", { storage: multerStorage("avatar") }))
  async updateAvatar(@uploadedOptionalFile() file: Express.Multer.File,@Body() updateAvatarProfile: UpdateAvatarProfile) {
    return this.profileService.updateAvatar(file,updateAvatarProfile);
  }


  @UseGuards(AuthGuard) 
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  @Put('updateProfile')
  async updateProfile(@Body() UpdateProfileDto: UpdateProfileDto) {
    return this.profileService.updateUserProfile(UpdateProfileDto);
  }

  @UseGuards(AuthGuard)
  @Get('downloadAvatar')
  async downloadAvatar(@Res() res: Response) {
    const filePath = await this.profileService.downloadAvatar()
    return res.sendFile(filePath)
  }

}
