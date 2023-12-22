import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserWithEmbeddedProfileDto } from './dto/create-user-with-embedded-profile';
import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly profilesService: ProfilesService,
  ) {}
  insertUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    return this.usersRepository.save(user);
  }

  async insertUserWithEmbeddedProfile(
    createUserWithEmbeddedProfileDto: CreateUserWithEmbeddedProfileDto,
  ): Promise<User> {
    const profile = await this.profilesService.insertProfile(
      createUserWithEmbeddedProfileDto.profile.gender,
      createUserWithEmbeddedProfileDto.profile.photo,
    );
    const user = new User();
    user.username = createUserWithEmbeddedProfileDto.username;
    user.password = createUserWithEmbeddedProfileDto.password;
    user.firstName = createUserWithEmbeddedProfileDto.firstName;
    user.lastName = createUserWithEmbeddedProfileDto.lastName;
    user.profile = profile;
    console.log(`saving ${JSON.stringify(user)}`);
    return this.usersRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['profile', 'photos'],
    });
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { username: username },
    });
  }

  async findUserById(id: string): Promise<User> {
    const result = await this.usersRepository.findOneBy({ id: parseInt(id) });
    return result;
  }

  async deleteUser(user: User): Promise<DeleteResult> {
    return await this.usersRepository.delete(user);
  }
}
