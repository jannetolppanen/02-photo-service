export class CreateUserWithEmbeddedProfileDto {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  profile: {
    gender: string;
    photo: string;
  };
}
