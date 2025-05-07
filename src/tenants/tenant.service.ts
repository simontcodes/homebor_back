import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TenantRepository } from './repositories/tenant.repository';
import { UserRepository } from 'src/users/user.repository';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UserRole } from 'src/users/enums/roles.enum';

@Injectable()
export class TenantService {
  constructor(
    private readonly tenantRepo: TenantRepository,
    private readonly userRepo: UserRepository,
    private readonly dataSource: DataSource,
  ) {}

  async createTenant(dto: CreateTenantDto) {
    const existing = await this.tenantRepo.findBySlug(dto.slug);
    if (existing) {
      throw new ConflictException('Tenant slug already exists');
    }

    const user = await this.userRepo.findOne(dto.adminUserId);
    if (!user) {
      throw new NotFoundException('Admin user not found');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const tenant = await this.tenantRepo.createWithQueryRunner(dto, queryRunner);
      await this.userRepo.updateWithQueryRunner(user.id, {
        role: UserRole.ADMIN,
      }, queryRunner);

      await queryRunner.commitTransaction();
      return tenant;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
