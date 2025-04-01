import { Controller, Get, Patch, Delete, Param, Body, UseGuards, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { Roles } from 'src/common/enums/role.enums';
import { Role } from 'src/common/decorators/role.decorator';
import { ChangeRoleDto, UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { swaggerConsumes } from 'src/common/enums/swaggerConsumes.enum';
import { paginationDto } from 'src/common/dtos/pagination.dto';
import { pagination } from 'src/common/decorators/pagination.decorator';

@Controller('users')
@ApiBearerAuth('Authorization') 
@UseGuards(AuthGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Role(Roles.Admin)
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  @pagination()
  @Get()
  async getAllUsers(@Query() pagination: paginationDto) {
      return this.userService.findAll(pagination);
  }

  @Patch(':id')
  @Role(Roles.Admin)
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  updateUser(@Param('id') id: number, @Body() updateDto: UserDto) {
    return this.userService.updateUser(id, updateDto);
  }

  @Delete(':id')
  @Role(Roles.Admin)
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @Patch(':id/role')
  @Role(Roles.Admin)
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  changeUserRole(@Param('id') id: number, @Body() changeRoleDto: ChangeRoleDto) {
    return this.userService.changeUserRole(id, changeRoleDto);
  }



  
}
