import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { TenantConfig } from 'src/tenantCongif/entities/tenant-config.entity';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.tenant)
  users: User[];

  @Column({ type: 'uuid' })
  adminUserId: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => TenantConfig, (config) => config.tenant, { cascade: true })
  config: TenantConfig;

  // @OneToMany(() => Client, (client) => client.tenant)
  // clients: Client[];

  // @OneToMany(() => Home, (home) => home.tenant)
  // Homes: Home[];
}
