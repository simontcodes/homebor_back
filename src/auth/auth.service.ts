import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from '../users/user.repository';
import { RoleRepository } from '../RBAC/role/repositories/roles.repository';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roleRepo: RoleRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto) {
    // 1. Check email uniqueness
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Look up the “admin” role
    const adminRole = await this.roleRepo.findByName('admin');
    if (!adminRole) {
      throw new NotFoundException('Default role "admin" not found');
    }

    // 4. Create the user, passing the roleId
    const createdUser = await this.userRepo.create({
      email: dto.email,
      password: hashedPassword,
      first_name: dto.first_name,
      last_name: dto.last_name,
      date_of_birth: dto.date_of_birth,
      role: adminRole,
    });

    // 5. Strip out sensitive/internal fields
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, created_at, updated_at, deletedAt, ...userSafe } =
      createdUser;

    // 6. Return the safe payload
    return userSafe;
  }

  async login(dto: LoginUserDto) {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        tenant: user.tenant
          ? {
              id: user.tenant.id,
              name: user.tenant.name,
              slug: user.tenant.slug,
            }
          : null,
      },
    };
  }
}
