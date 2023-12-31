import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UsersService } from 'src/users/users.service';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private photosRepository: Repository<Photo>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    private usersService: UsersService,
    private categoriesService: CategoriesService,
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

    const categories = createPhotoDto.categories.map(async (categoryId) => {
      const category = await this.categoriesService.findCategoryById(
        parseInt(categoryId),
      );
      if (!category) {
        throw new NotFoundException(`Category not found: ${categoryId}`);
      }
      return category;
    });

    // TODO: Add categories to photo item
    const photo = new Photo();
    photo.name = createPhotoDto.name;
    photo.description = createPhotoDto.description;
    photo.url = createPhotoDto.url;
    photo.user = user;
    photo.categories = await Promise.all(categories);
    return await this.photosRepository.save(photo);
  }

  async getPhotos(): Promise<Photo[]> {
    return this.photosRepository.find({ relations: ['user'] });
  }

  async findPhotoById(id: string): Promise<Photo> {
    const result = await this.photosRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['user', 'categories'],
    });
    return result;
  }

  async findPhotosByName(name: string): Promise<Photo[]> {
    console.log('trigger');
    const result = await this.photosRepository.find({
      where: { name: name },
      relations: ['user'],
    });
    console.log(`findPhotosByName: ${JSON.stringify(result)}`);
    return result;
  }

  async deletePhoto(photo: Photo): Promise<Photo> {
    return await this.photosRepository.remove(photo);
  }

  async updatePhoto(photo: Photo): Promise<Photo> {
    return await this.photosRepository.save(photo);
  }
}
