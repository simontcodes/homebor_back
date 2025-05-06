import { Injectable } from '@nestjs/common';
import { TenantRepository } from './repositories/tenant.repository';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantService {
  constructor(private readonly tenantRepo: TenantRepository) {}

  create(dto: CreateTenantDto) {
    return this.tenantRepo.create(dto);
  }

  findAll() {
    return this.tenantRepo.findAll();
  }

  findOne(id: string) {
    return this.tenantRepo.findById(id);
  }

  findBySlug(slug: string) {
    return this.tenantRepo.findBySlug(slug);
  }

  update(id: string, dto: UpdateTenantDto) {
    return this.tenantRepo.update(id, dto);
  }

  remove(id: string) {
    return this.tenantRepo.remove(id);
  }
}
