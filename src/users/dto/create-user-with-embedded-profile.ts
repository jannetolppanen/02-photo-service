export class CreateUserWithEmbeddedProfileDto {
  firstName: string;
  lastName: string;
  email: string;
  profile: {
    gender: string;
    photo: string;
  };
}
