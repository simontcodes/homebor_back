import { DataSource } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { Permission } from '../permissions/permission.entity';
import { PermissionsEnum } from '../enums/permissions.enum';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'your_password',
  database: 'your_db',
  entities: [Role, Permission],
  synchronize: false,
});

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

async function seed() {
  await dataSource.initialize();
  const permissionRepo = dataSource.getRepository(Permission);
  const roleRepo = dataSource.getRepository(Role);

  // Seed all permissions
  const permissionEntities: Permission[] = [];
  for (const code of PERMISSIONS) {
    let permission = await permissionRepo.findOneBy({ code });
    if (!permission) {
      permission = permissionRepo.create({ code });
      await permissionRepo.save(permission);
    }
    permissionEntities.push(permission);
  }

  // Seed roles and attach permissions
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

  console.log('🌱 Seeding complete');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  dataSource.destroy();
});
