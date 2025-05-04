import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  create(dto: CreateUserDto) {
    // Add business logic if needed
    return this.userRepo.create(dto);
  }

  findAll() {
    return this.userRepo.findAll();
  }

  findOne(id: string) {
    return this.userRepo.findOne(id);
  }

  update(id: string, dto: UpdateUserDto) {
    return this.userRepo.update(id, dto);
  }

  remove(id: string) {
    return this.userRepo.remove(id);
  }
}
