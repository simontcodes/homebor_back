import { Entity, Column, ManyToOne } from 'typeorm';

import { Tenant } from 'src/tenants/entities/tenant.entity';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Client extends BaseEntity {
  @ManyToOne(() => Tenant, (tenant) => tenant.clients, { nullable: false })
  tenant: Tenant;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column()
  gender: string;

  @Column()
  phone: string;

  @Column()
  origin_language: string;

  @Column()
  country_of_residence: string;

  @Column({ nullable: true })
  agency: string;

  @Column({ nullable: true })
  school: string;

  @Column()
  accommodation_type: string;

  @Column()
  meal_plan: string;

  @Column('json', { nullable: true })
  house_preference: Record<string, any>;

  @Column('json', { nullable: true })
  health_info: Record<string, any>;

  @Column()
  emergency_contact_name: string;

  @Column()
  emergency_contact_phone: string;

  @Column({ default: true }) // change this to false after testing
  approved: boolean;

  @ManyToOne(() => User, { nullable: true })
  approved_by: User | null;

  @Column({ type: 'timestamp', nullable: true })
  approved_at: Date | null;
}
