import { Injectable, NotFoundException } from '@nestjs/common';

import { HomeRepository } from './repositories/homes.repository';
import { CreateHomeDto } from './dto/create-home.dto';
import { TenantRepository } from 'src/tenants/repositories/tenant.repository';

//todo: add an approve home method

@Injectable()
export class HomeService {
  constructor(
    private readonly homeRepo: HomeRepository,
    private readonly tenantRepo: TenantRepository,
  ) {}

  async create(dto: CreateHomeDto) {
    const provider = await this.tenantRepo.findById(dto.homeProviderId);
    if (!provider) throw new NotFoundException('Provider not found');

    return this.homeRepo.create({ ...dto, provider });
  }

  findAll() {
    return this.homeRepo.findAll();
  }

  findById(id: string) {
    return this.homeRepo.findById(id);
  }

  remove(id: string) {
    return this.homeRepo.remove(id);
  }
}
