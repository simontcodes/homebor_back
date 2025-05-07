import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from 'src/common/entities/base.entity';
import { UserRole } from './enums/roles.enum';

@Entity()
export class User extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  date_of_birth: Date;

  @Column({ default: 'coordinator' })
  role: UserRole;
}
