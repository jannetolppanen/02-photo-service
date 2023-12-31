import { ApiProperty } from '@nestjs/swagger';

export class UpdatePhotoDto {
  @ApiProperty({ example: '1', description: 'id of the photo' })
  id?: number;
  @ApiProperty({ example: 'Flowers', description: 'The name of the photo' })
  name?: string;
  @ApiProperty({
    example: 'Flowers on the field',
    description: 'The description of the photo',
  })
  description?: string;
  @ApiProperty({ example: 'www.google.com', description: 'Url to the photo' })
  url?: string;
  @ApiProperty({ example: 'Pekka', description: 'Who took the photo' })
  username?: string;
  @ApiProperty({ example: '[1, 2]', description: 'categories of the picture' })
  categories?: string[];
}
