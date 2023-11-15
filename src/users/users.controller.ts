import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserWithEmbeddedProfileDto } from './dto/create-user-with-embedded-profile';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // @Post()
  // async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   console.log(`createUser: ${JSON.stringify(createUserDto)}`);
  //   return await this.usersService.insertUser(createUserDto);
  // }

  @Post()
  async createUserWithEmbeddedProfile(
    @Body() createUserWithEmbeddedProfileDto: CreateUserWithEmbeddedProfileDto,
  ): Promise<User> {
    console.log(
      `createUserWithEmbeddedProfile: ${JSON.stringify(
        createUserWithEmbeddedProfileDto,
      )}`,
    );
    return await this.usersService.insertUserWithEmbeddedProfile(
      createUserWithEmbeddedProfileDto,
    );
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }
}
