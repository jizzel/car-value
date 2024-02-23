import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private userservice: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userservice.create(body.email, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userservice.findOne(id);
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
