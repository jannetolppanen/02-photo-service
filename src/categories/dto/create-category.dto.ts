import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Summer', description: 'Category name' })
  name: string;
  @ApiProperty({
    example: 'Summer photos',
    description: 'Category description',
  })
  description: string;
}
