export class CreatePhotoDto {
  name: string;
  description: string;
  url: string;
  user_email: string;
  // TODO: Add categories
  categories: string[];
}
