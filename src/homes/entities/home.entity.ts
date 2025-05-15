import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Tenant } from 'src/tenants/entities/tenant.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Home extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
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
}
