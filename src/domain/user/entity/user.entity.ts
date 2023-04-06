import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AUTHORITY } from './enum/authority.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: AUTHORITY.ROLE_USER })
  authority: AUTHORITY;

  constructor(name: string, email: string, password: string) {
    this.username = name;
    this.email = email;
    this.password = password;
  }
}
