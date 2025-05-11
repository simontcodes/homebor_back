import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';

import { Tenant } from '../entities/tenant.entity';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';
import { CreateTenantDtoWithSlug } from '../dto/create-tenant.dto';

@Injectable()
export class TenantRepository {
  constructor(
    @InjectRepository(Tenant)
    private readonly repo: Repository<Tenant>,
  ) {}

  async createWithQueryRunner(dto: CreateTenantDtoWithSlug, queryRunner: QueryRunner): Promise<Tenant> {
    const tenant = queryRunner.manager.create(Tenant, dto);
    return await queryRunner.manager.save(tenant);
  }

  findAll() {
    return this.repo.find();
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  findBySlug(slug: string) {
    return this.repo.findOne({ where: { slug } });
  }

  async update(id: string, data: UpdateTenantDto) {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
