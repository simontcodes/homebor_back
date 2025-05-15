import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RoleRepository } from '../RBAC/role/repositories/roles.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roleRepo: RoleRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const role = await this.roleRepo.findById(dto.roleId);
    if (!role) throw new NotFoundException('Role not found');

    return this.userRepo.create({
      ...dto,
      role,
    });
  }

  async findWithRoleAndPermissions(userId: string): Promise<User> {
    const user = await this.userRepo.findByIdWithRoleAndPermissions(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  findAll() {
    return this.userRepo.findAll();
  }

  findOne(id: string) {
    return this.userRepo.findOne(id);
  }

  update(id: string, dto: UpdateUserDto) {
    return this.userRepo.updateWithQueryRunner(id, dto);
  }

  remove(id: string) {
    return this.userRepo.remove(id);
  }
}
