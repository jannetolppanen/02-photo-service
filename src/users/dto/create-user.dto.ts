import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'PerusPekka' })
  username: string;
  @ApiProperty({ example: 'passu' })
  password: string;
  @ApiProperty({ example: 'Pekka' })
  firstName: string;
  @ApiProperty({ example: 'Virtane' })
  lastName: string;
}
