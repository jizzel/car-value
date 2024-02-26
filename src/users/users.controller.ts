import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
  constructor(private userservice: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.userservice.create(body.email, body.password);
  }

  @UseInterceptors(SerializeInterceptor)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userservice.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  findAll(@Query('email') email: string) {
    return this.userservice.find(email);
  }

  @Delete()
  deleteUser(@Param('id') id: string) {
    return this.userservice.remove(id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userservice.update(id, body);
  }
}
