import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Home } from '../entities/home.entity';

@Injectable()
export class HomeRepository {
  private readonly repo: Repository<Home>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Home);
  }

  async create(data: DeepPartial<Home>): Promise<Home> {
    const entity = this.repo.create(data); // prepares relations too
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({ relations: ['provider'] });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['provider'] });
  }

  remove(id: string) {
    return this.repo.softDelete(id);
  }
}
