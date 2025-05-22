import { Injectable, NotFoundException } from '@nestjs/common';

import { TenantConfigRepository } from './repositories/tenant-config.repository';
import { UpdateTenantConfigDto } from './dto/update-tenant-config.dto';
import { CreateTenantConfigDto } from './dto/create-tenant-config.dto';

@Injectable()
export class TenantConfigService {
  constructor(private readonly configRepo: TenantConfigRepository) {}

  async create(dto: CreateTenantConfigDto) {
    return this.configRepo.create(dto);
  }

  async updateByTenantId(tenantId: string, dto: UpdateTenantConfigDto) {
    try {
      return await this.configRepo.updateByTenantId(tenantId, dto);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Tenant config not found';
      throw new NotFoundException(message);
    }
  }

  async findAll() {
    return this.configRepo.findAll();
  }

  async findBySlug(slug: string) {
    const config = await this.configRepo.findBySlug(slug);
    if (!config) throw new NotFoundException('Tenant config not found');
    return config;
  }
}
