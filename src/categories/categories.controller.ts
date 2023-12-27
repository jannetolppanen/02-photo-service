import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
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

  // @Put('/:id')
  // async updateCategory(
  //   @Param('id') id: number,
  //   @Body() updatedCategory: UpdateCategoryDto,
  // ): Promise<Category> {
  //   const existingCategory = await this.categoriesService.getCategoryById(id);
  //   const mergedCategory = {
  //     ...existingCategory,
  //     ...updatedCategory,
  //   };
  //   return await this.categoriesService.updateCategory(id, mergedCategory);
  // }
}
