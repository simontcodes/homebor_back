import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { PairingRepository } from './repositories/pairings.repository';
import { ClientRepository } from '../clients/repositories/clients.repository';
import { HomeRepository } from '../homes/repositories/homes.repository';
import { CreatePairingDto } from './dto/create-pairing.dto';
import { AuthUser } from 'src/auth/jwt.strategy';

@Injectable()
export class PairingService {
  constructor(
    private readonly pairingRepo: PairingRepository,
    private readonly clientRepo: ClientRepository,
    private readonly homeRepo: HomeRepository,
  ) {}

  async create(dto: CreatePairingDto, user: AuthUser) {
    console.log(user);
    const client = await this.clientRepo.findById(dto.clientId);
    if (!client) throw new NotFoundException('Client not found');
    if (!client.approved)
      throw new BadRequestException('Client is not approved');

    const home = await this.homeRepo.findById(dto.homeId);
    if (!home) throw new NotFoundException('Home not found');
    if (!home.is_approved)
      throw new BadRequestException('Home is not approved');

    const existingPairing = await this.pairingRepo.findActiveByClientId(
      dto.clientId,
    );
    if (existingPairing) {
      throw new BadRequestException('Client already has an active pairing');
    }

    return this.pairingRepo.create(dto);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deactivateExpiredPairingsCron() {
    await this.pairingRepo.deactivateExpiredPairings();
  }

  findAll() {
    return this.pairingRepo.findAll();
  }

  findById(id: string) {
    return this.pairingRepo.findById(id);
  }
}
