import 'dotenv/config';
import { DataSource } from 'typeorm';

import { Role } from '../role/entities/role.entity';
import { Permission } from '../permissions/permission.entity';
import { PermissionsEnum } from '../enums/permissions.enum';

const PERMISSIONS = Object.values(PermissionsEnum);

const ROLES: Record<string, PermissionsEnum[]> = {
  super_admin: [
    PermissionsEnum.TENANT_CREATE,
    PermissionsEnum.CONFIG_UPDATE,
    PermissionsEnum.USER_MANAGE,
    PermissionsEnum.DASHBOARD_VIEW,
  ],
  admin: [
    PermissionsEnum.CONFIG_UPDATE,
    PermissionsEnum.USER_MANAGE,
    PermissionsEnum.DASHBOARD_VIEW,
  ],
  coordinator: [PermissionsEnum.DASHBOARD_VIEW],
  client: [],
};

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Role, Permission],
  synchronize: false,
});

async function seed() {
  try {
    await dataSource.initialize();

    const permissionRepo = dataSource.getRepository(Permission);
    const roleRepo = dataSource.getRepository(Role);

    const permissionEntities: Permission[] = [];

    for (const code of PERMISSIONS) {
      let permission = await permissionRepo.findOneBy({ code });
      if (!permission) {
        permission = permissionRepo.create({ code });
        await permissionRepo.save(permission);
      }
      permissionEntities.push(permission);
    }

    for (const [roleName, assignedPermissions] of Object.entries(ROLES)) {
      let role = await roleRepo.findOne({
        where: { name: roleName },
        relations: ['permissions'],
      });

      if (!role) {
        role = roleRepo.create({ name: roleName });
      }

      role.permissions = permissionEntities.filter((p) =>
        assignedPermissions.includes(p.code as PermissionsEnum),
      );

      await roleRepo.save(role);
      console.log(`✅ Seeded role: ${roleName}`);
    }

    await dataSource.destroy();
    console.log('🌱 Seeding complete');
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seed();
