import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;

  @ManyToMany(() => Category, (category) => category.photos, { cascade: true })
  @JoinTable() // This decorator is required for many-to-many relations. Automatically creates a join table.
  categories: Category[];
}
