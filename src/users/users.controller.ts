import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserWithEmbeddedProfileDto } from './dto/create-user-with-embedded-profile';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  // lisäämällä useguardsin mihin tahansa endpointtiin saa käytttöön jwt:n
  @UseGuards(JwtAuthGuard)
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }
}
