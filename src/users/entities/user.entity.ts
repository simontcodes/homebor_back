import { Entity, Column, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { Role } from '../../RBAC/role/entities/role.entity';

//todo: add permissions to user

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

  @ManyToOne(() => Tenant, (tenant) => tenant.users, { nullable: true })
  tenant: Tenant;

  @ManyToOne(() => Role, { eager: true })
  role: Role;
}
