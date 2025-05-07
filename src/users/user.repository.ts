import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    return await this.repo.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async updateWithQueryRunner(id: string, data: Partial<User>, queryRunner?: QueryRunner): Promise<void> {
    await queryRunner?.manager.update(User, id, data);
  }

  async remove(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}
