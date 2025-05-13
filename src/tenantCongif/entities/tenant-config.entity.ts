import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';

@Entity()
export class TenantConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Tenant, (tenant) => tenant.config, { onDelete: 'CASCADE' })
  @JoinColumn()
  tenant: Tenant;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ nullable: true })
  themeColor: string;

  @Column({ nullable: true })
  welcomeMessage: string;

  @Column({ nullable: true })
  contactEmail: string;

  @Column('simple-array', { nullable: true })
  featuredHomes: string[];

  @Column({ default: true })
  showNewsletterSignup: boolean;
}
