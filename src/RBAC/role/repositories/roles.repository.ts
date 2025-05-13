import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepository {
  private readonly repo: Repository<Role>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Role);
  }

  findById(id: string) {
    return this.repo.findOneBy({ id });
  }

  findByName(name: string) {
    return this.repo.findOneBy({ name });
  }

  findAll() {
    return this.repo.find();
  }
}
