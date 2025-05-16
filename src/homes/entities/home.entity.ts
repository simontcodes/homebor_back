import { Entity, Column, ManyToOne } from 'typeorm';

import { Tenant } from 'src/tenants/entities/tenant.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Home extends BaseEntity {
  @ManyToOne(() => Tenant, { nullable: false })
  provider: Tenant;

  @Column()
  phone: string;

  @Column('text')
  address: string;

  @Column('text', { nullable: true })
  background: string;

  @Column({ default: false })
  pets: boolean;

  @Column({ nullable: true })
  age_preference: string;

  @Column({ nullable: true })
  gender_preference: string;

  @Column({ default: false })
  food_service: boolean;

  @Column({ default: false })
  special_diet: boolean;

  @Column({ default: true }) //change this to false after testing
  is_approved: boolean;

  @Column({ type: 'timestamp', nullable: true })
  approved_at: Date;

  @ManyToOne(() => User, { nullable: true })
  approved_by: User;
}
