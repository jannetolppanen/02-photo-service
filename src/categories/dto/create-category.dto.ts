import { Body, Post, Controller, Get } from '@nestjs/common';
import { CategoriesService } from '../categories.service';
import { Category } from '../entities/category.entity';

export class CreateCategoryDto {
  name: string;
  description: string;

  constructor(private categoriesService: CategoriesService) {}

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.insertCategory(createCategoryDto);
  }

  @Get()
  async getCategories(): Promise<Category[]> {
    return await this.categoriesService.getCategories();
  }
}
