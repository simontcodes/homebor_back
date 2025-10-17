import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { HomeRepository } from './repositories/homes.repository';
import { CreateHomeDto } from './dto/create-home.dto';
import { TenantRepository } from 'src/tenants/repositories/tenant.repository';
import { AuthUser } from 'src/auth/jwt.strategy';
import { DeepPartial } from 'typeorm';
import { Home } from './entities/home.entity';

//todo: add an approve home method

@Injectable()
export class HomeService {
  private readonly logger = new Logger(HomeService.name);
  constructor(
    private readonly homeRepo: HomeRepository,
    private readonly tenantRepo: TenantRepository,
  ) {}

  async create(dto: CreateHomeDto, auth: AuthUser) {
    const providerId = auth.tenant?.id;
    if (!providerId) {
      throw new BadRequestException(
        'providerId is required to create a home (from auth.tenant.id).',
      );
    }

    // Only include columns that exist on Home entity
    const toCreate: DeepPartial<Home> = {
      phone: dto.phone,
      address: dto.address,
      background: dto['background'] ?? null,
      pets: dto.pets,
      age_preference: dto.age_preference,
      gender_preference: dto.gender_preference,
      food_service: dto.food_service,
      special_diet: dto.special_diet,
      // set relation by id:
      provider: { id: providerId } as any, // DeepPartial<Tenant> is OK; `as any` avoids over-strict typing
      // approved_by / approved_at / is_approved left out intentionally
    };

    this.logger.debug('[create] payload for repo:', toCreate);

    try {
      return await this.homeRepo.create(toCreate);
    } catch (err: any) {
      this.logger.error('[create] error:', err);
      if (err?.code === 'ER_NO_DEFAULT_FOR_FIELD') {
        throw new BadRequestException(
          err?.sqlMessage ?? 'Missing required DB field',
        );
      }
      throw new InternalServerErrorException('Failed to create home');
    }
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
