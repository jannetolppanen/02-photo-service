import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoDto {
  @ApiProperty({ example: 'Flowers', description: 'The name of the photo' })
  name: string;
  @ApiProperty({
    example: 'Flowers on the field',
    description: 'The description of the photo',
  })
  description: string;
  @ApiProperty({ example: 'www.google.com', description: 'Url to the photo' })
  url: string;
  @ApiProperty({ example: 'Pekka', description: 'Who took the photo' })
  username: string;
  // TODO: Add categories
  @ApiProperty({ example: '[1, 2]', description: 'categories of the picture' })
  categories: string[];
}
