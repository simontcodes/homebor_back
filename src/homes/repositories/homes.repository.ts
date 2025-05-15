import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Home } from '../entities/home.entity';

@Injectable()
export class HomeRepository {
  private readonly repo: Repository<Home>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Home);
  }

  create(data: Partial<Home>) {
    return this.repo.save(data);
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
