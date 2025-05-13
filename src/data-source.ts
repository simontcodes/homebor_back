import 'dotenv/config';
import { DataSource } from 'typeorm';
import path from 'path';

import { Role } from './RBAC/role/entities/role.entity';
import { Permission } from './RBAC/permissions/permission.entity';
import { User } from './users/entities/user.entity';
import { Tenant } from './tenants/entities/tenant.entity';
import { TenantConfig } from './tenantCongif/entities/tenant-config.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,    // Set to false in production
  logging: false,
  entities: [User, Role, Permission, Tenant, TenantConfig],
  migrations: [path.join(__dirname, 'migrations', '*.ts')],
});
