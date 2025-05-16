import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pairing } from '../entities/pairing.entity';
import { CreatePairingDto } from '../dto/create-pairing.dto';
import { Home } from 'src/homes/entities/home.entity';
import { Client } from 'src/clients/entities/client.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PairingRepository {
  constructor(
    @InjectRepository(Pairing) private readonly repo: Repository<Pairing>,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreatePairingDto): Promise<Pairing> {
    const clientRepo = this.dataSource.getRepository(Client);
    const homeRepo = this.dataSource.getRepository(Home);

    const client = await clientRepo.findOne({ where: { id: dto.clientId } });
    const home = await homeRepo.findOne({ where: { id: dto.homeId } });

    if (!client || !home) throw new Error('Client or home not found');

    const pairing = this.repo.create({
      client,
      home,
      start_date: new Date(dto.start_date),
      end_date: new Date(dto.end_date),
    });

    return this.repo.save(pairing);
  }

  async findActiveByClientId(clientId: string): Promise<Pairing | null> {
    return this.repo.findOne({
      where: {
        client: { id: clientId },
        active: true,
      },
      relations: ['client', 'home'],
    });
  }

  async deactivateExpiredPairings(): Promise<void> {
    await this.repo
      .createQueryBuilder()
      .update()
      .set({ active: false })
      .where('active = true')
      .andWhere('end_date < NOW()')
      .execute();
  }

  findAll(): Promise<Pairing[]> {
    return this.repo.find({ relations: ['client', 'home'] });
  }

  findById(id: string): Promise<Pairing | null> {
    return this.repo.findOne({ where: { id }, relations: ['client', 'home'] });
  }
}
