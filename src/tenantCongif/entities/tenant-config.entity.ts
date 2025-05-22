import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import { Tenant } from '../../tenants/entities/tenant.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class TenantConfig extends BaseEntity {
  @OneToOne(() => Tenant, (tenant) => tenant.config, { onDelete: 'CASCADE' })
  @JoinColumn()
  tenant: Tenant;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ nullable: true })
  faviconUrl: string;

  @Column({ nullable: true })
  heroText: string;

  @Column({ nullable: true })
  heroImageUrl: string;

  @Column({ nullable: true })
  themeColor: string;

  @Column({ nullable: true })
  welcomeMessage: string;

  @Column({ nullable: true })
  websiteTitle: string;

  @Column({ nullable: true })
  contactEmail: string;

  @Column({ default: true })
  showNewsletterSignup: boolean;
}
