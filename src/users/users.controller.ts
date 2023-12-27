import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserWithEmbeddedProfileDto } from './dto/create-user-with-embedded-profile';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
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
  // @UseGuards(JwtAuthGuard)
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    console.log(id);
    const user = await this.usersService.findUserById(id);
    console.log(`getUserById: ${JSON.stringify(user)}`);
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<DeleteResult> {
    console.log(id);
    const user = await this.usersService.findUserById(id);
    console.log(`deleteUser: ${JSON.stringify(user)}`);
    if (!user) {
      throw new Error('user not found');
    }
    return await this.usersService.deleteUser(user);
  }
  // update user information
  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new Error('user not found');
    }
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    return await this.usersService.updateUser(user);
  }
}
