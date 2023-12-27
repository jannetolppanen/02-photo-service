import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Photo } from './entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Post()
  async createPhotoUsingEmail(
    @Body() createPhotoDto: CreatePhotoDto,
  ): Promise<Photo> {
    return await this.photosService.insertPhoto(createPhotoDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  async getPhotos(): Promise<Photo[]> {
    return await this.photosService.getPhotos();
  }

  @Get('/:id')
  async getPhotoById(@Param('id') id: string): Promise<Photo> {
    const photo = await this.photosService.findPhotoById(id);
    if (!photo) {
      throw new Error('photo not found');
    }
    return photo;
  }

  @Delete('/:id')
  async deletePhoto(@Param('id') id: string): Promise<Photo> {
    const photo = await this.photosService.findPhotoById(id);
    if (!photo) {
      console.log(`deletePhoto: photo not found`);
      throw new Error('photo not found');
    }
    return await this.photosService.deletePhoto(photo);
  }
}
