import { Profile } from 'src/profiles/entities/profile.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Photo } from 'src/photos/entities/photo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // optional because of the `?` symbol
  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile?: Profile;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos?: Photo[];
}
