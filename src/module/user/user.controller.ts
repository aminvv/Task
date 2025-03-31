import { Controller, Get, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { Roles } from 'src/common/enums/role.enums';
import { Role } from 'src/common/decorators/role.decorator';
import { ChangeRoleDto, UpdateUserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { swaggerConsumes } from 'src/common/enums/swaggerConsumes.enum';

@Controller('users')
@ApiBearerAuth('Authorization') 
@UseGuards(AuthGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Role(Roles.Admin)
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  @Role(Roles.Admin)
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  updateUser(@Param('id') id: number, @Body() updateDto: UpdateUserDto) {
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
