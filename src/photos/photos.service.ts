import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private photosRepository: Repository<Photo>,
    private usersService: UsersService,
  ) {}

  // Search for a user by email address and if found, create a new photo
  async insertPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    const user = await this.usersService.findUserByUsername(
      // search with email address because CreatePhotoDto uses email address
      createPhotoDto.username,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log(`insertPhoto user found ${user.username}`);

    // TODO: Add categories to photo item
    const photo = new Photo();
    photo.name = createPhotoDto.name;
    photo.description = createPhotoDto.description;
    photo.url = createPhotoDto.url;
    photo.user = user;
    return await this.photosRepository.save(photo);
  }

  async getPhotos(): Promise<Photo[]> {
    return this.photosRepository.find({ relations: ['user'] });
  }
}
