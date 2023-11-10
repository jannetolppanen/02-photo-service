import { Controller, Post, Body } from '@nestjs/common';
import { CreateUser } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() createUserDto: CreateUser): Promise<User> {
    console.log(`createUser: ${JSON.stringify(createUserDto)}`);
    return await this.usersService.insertUser(createUserDto);
  }
}
