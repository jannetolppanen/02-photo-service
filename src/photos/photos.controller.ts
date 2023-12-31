import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Photo } from './entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Post a new photo' })
  @ApiParam({
    name: 'name',
    description: 'description',
  })
  @ApiResponse({ status: 200, description: 'Posted photo', type: Photo })
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
  @UseGuards(JwtAuthGuard)
  async deletePhoto(@Param('id') id: string): Promise<Photo> {
    const photo = await this.photosService.findPhotoById(id);
    if (!photo) {
      console.log(`deletePhoto: photo not found`);
      throw new Error('photo not found');
    }
    return await this.photosService.deletePhoto(photo);
  }
  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async updatePhoto(
    @Param('id') id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ): Promise<Photo> {
    const photo = await this.photosService.findPhotoById(id);
    if (!photo) {
      console.log(`updatePhoto: photo not found`);
      throw new Error('photo not found');
    }

    if (updatePhotoDto.name) {
      photo.name = updatePhotoDto.name;
    }
    if (updatePhotoDto.description) {
      photo.description = updatePhotoDto.description;
    }
    if (updatePhotoDto.url) {
      photo.url = updatePhotoDto.url;
    }

    return await this.photosService.updatePhoto(photo);
  }
}
