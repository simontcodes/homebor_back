import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from '../entities/client.entity';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly repo: Repository<Client>,
  ) {}

  create(data: Partial<Client>) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find({ relations: ['tenant', 'approved_by'] });
  }

  findById(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['tenant', 'approved_by'],
    });
  }

  async update(id: string, data: Partial<Client>) {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  remove(id: string) {
    return this.repo.softDelete(id);
  }
}
