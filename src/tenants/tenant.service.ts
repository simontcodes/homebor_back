import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

import { TenantRepository } from './repositories/tenant.repository';
import { UserRepository } from '../users/user.repository';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UserRole } from '../users/enums/roles.enum';
import { slugify } from '../common/utils/slugify';
import { toPublicUser } from '../common/utils/public-user-formatting';
import { UpdateTenantConfigDto } from './dto/update-tenant-config.dto';
import { RoleRepository } from './../RBAC/role/repositories/roles.repository';

@Injectable()
export class TenantService {
  constructor(
    private readonly tenantRepo: TenantRepository,
    private readonly userRepo: UserRepository,
    private readonly dataSource: DataSource,
    private readonly roleRepo: RoleRepository,
  ) {}

  async createTenant(dto: CreateTenantDto) {
    console.log('Creating tenant:', dto);
  
    const slug = slugify(dto.name);
    const existing = await this.tenantRepo.findBySlug(slug);
    if (existing) {
      throw new ConflictException('Tenant slug already exists');
    }
  
    const user = await this.userRepo.findOne(dto.adminUserId);
    if (!user) {
      throw new NotFoundException('Admin user not found');
    }
  
    const adminRole = await this.roleRepo.findByName('admin');
    if (!adminRole) {
      throw new NotFoundException('Role "admin" not found');
    }
  
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      const tenant = await this.tenantRepo.createWithQueryRunner(
        {
          name: dto.name,
          email: dto.email,
          adminUserId: dto.adminUserId,
          slug,
        },
        queryRunner,
      );
  
      await this.userRepo.updateWithQueryRunner(
        user.id,
        {
          role: adminRole, // ✅ Assign Role entity instead of enum
          tenant: tenant,
        },
        queryRunner,
      );
  
      await queryRunner.commitTransaction();
  
      const updatedUser = await this.userRepo.findByIdWithTenant(user.id);
      if (!updatedUser) {
        throw new NotFoundException('Updated user not found');
      }
  
      return {
        tenant,
        user: toPublicUser(updatedUser),
      };
    } catch (err) {
      console.error('Tenant creation failed:', err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
  

  async findAll() {
    return this.tenantRepo.findAll();
  }

  // async updateConfig(tenantId: string, dto: UpdateTenantConfigDto) {
  //   const tenant = await this.tenantRepo.findById(tenantId);
  //   if (!tenant) {
  //     throw new NotFoundException('Tenant not found');
  //   }

  //   Object.assign(tenant, dto);
  //   return this.tenantRepo.save(tenant);
  // }
}
