import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TenantConfig } from '../entities/tenant-config.entity';
import { CreateTenantConfigDto } from '../dto/create-tenant-config.dto';
import { Tenant } from 'src/tenants/entities/tenant.entity';

@Injectable()
export class TenantConfigRepository {
  private repo: Repository<TenantConfig>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(TenantConfig);
  }

  async create(dto: CreateTenantConfigDto): Promise<TenantConfig> {
    try {
      const tenant = await this.dataSource
        .getRepository(Tenant)
        .findOne({ where: { id: dto.tenantId } });
      if (!tenant) {
        throw new NotFoundException('Tenant not found');
      }

      const existing = await this.findByTenantId(dto.tenantId);
      if (existing) {
        throw new ConflictException('Tenant already has a config');
      }

      const config = this.repo.create({ ...dto, tenant });
      return await this.repo.save(config);
    } catch (err) {
      console.error('Error creating TenantConfig:', err);
      throw err;
    }
  }

  async findByTenantId(tenantId: string): Promise<TenantConfig | null> {
    return this.repo.findOne({ where: { tenant: { id: tenantId } } });
  }

  async findBySlug(slug: string): Promise<TenantConfig | null> {
    return this.repo.findOne({
      where: { tenant: { slug } },
      relations: ['tenant'],
    });
  }

  async updateByTenantId(
    tenantId: string,
    dto: Partial<TenantConfig>,
  ): Promise<TenantConfig> {
    const config = await this.findByTenantId(tenantId);
    if (!config) throw new Error('Tenant config not found');
    Object.assign(config, dto);
    return this.repo.save(config);
  }
}
