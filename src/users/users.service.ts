import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
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
    user.firstName = createUserWithEmbeddedProfileDto.firstName;
    user.lastName = createUserWithEmbeddedProfileDto.lastName;
    user.email = createUserWithEmbeddedProfileDto.email;
    user.profile = profile;
    console.log(`saving ${JSON.stringify(user)}`);
    return this.usersRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ['profile'] });
  }
}
