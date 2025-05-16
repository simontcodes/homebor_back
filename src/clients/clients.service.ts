import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from './repositories/clients.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UserRepository } from 'src/users/user.repository';
import { TenantRepository } from 'src/tenants/repositories/tenant.repository';
import { User } from 'src/users/entities/user.entity';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepo: ClientRepository,
    private readonly userRepo: UserRepository,
    private readonly tenantRepo: TenantRepository,
  ) {}

  async create(dto: CreateClientDto) {
    const tenant = await this.tenantRepo.findById(dto.tenantId);
    if (!tenant) throw new NotFoundException('Tenant not found');

    let approver: User | null = null;
    if (dto.approved_by) {
      approver = await this.userRepo.findOne(dto.approved_by);
      if (!approver) throw new NotFoundException('Approver not found');
    }

    const client = await this.clientRepo.create({
      ...dto,
      tenant,
      approved_by: approver,
      approved_at: dto.approved ? new Date() : null,
      date_of_birth: new Date(dto.date_of_birth),
    });

    return client;
  }

  findAll() {
    return this.clientRepo.findAll();
  }

  findById(id: string) {
    return this.clientRepo.findById(id);
  }

  async update(id: string, dto: Partial<CreateClientDto>) {
    const updatedDto: Partial<Client> = {};

    if (dto.first_name) updatedDto.first_name = dto.first_name;
    if (dto.last_name) updatedDto.last_name = dto.last_name;
    if (dto.gender) updatedDto.gender = dto.gender;
    if (dto.phone) updatedDto.phone = dto.phone;
    if (dto.origin_language) updatedDto.origin_language = dto.origin_language;
    if (dto.country_of_residence)
      updatedDto.country_of_residence = dto.country_of_residence;
    if (dto.agency) updatedDto.agency = dto.agency;
    if (dto.school) updatedDto.school = dto.school;
    if (dto.accommodation_type)
      updatedDto.accommodation_type = dto.accommodation_type;
    if (dto.meal_plan) updatedDto.meal_plan = dto.meal_plan;
    if (dto.house_preference)
      updatedDto.house_preference = dto.house_preference;
    if (dto.health_info) updatedDto.health_info = dto.health_info;
    if (dto.emergency_contact_name)
      updatedDto.emergency_contact_name = dto.emergency_contact_name;
    if (dto.emergency_contact_phone)
      updatedDto.emergency_contact_phone = dto.emergency_contact_phone;
    if (dto.date_of_birth)
      updatedDto.date_of_birth = new Date(dto.date_of_birth);

    if (typeof dto.approved === 'boolean') {
      updatedDto.approved = dto.approved;
      updatedDto.approved_at = dto.approved ? new Date() : null;
    }

    if (dto.approved_by) {
      const approver = await this.userRepo.findOne(dto.approved_by);
      if (!approver) throw new NotFoundException('Approver not found');
      updatedDto.approved_by = approver;
    }

    return this.clientRepo.update(id, updatedDto);
  }

  remove(id: string) {
    return this.clientRepo.remove(id);
  }
}
