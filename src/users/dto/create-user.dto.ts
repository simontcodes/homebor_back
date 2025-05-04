import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

import { UserRole } from '../user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(['super_user', 'admin', 'coordinator'])
  role: UserRole;

  @IsNotEmpty()
  tenantSlug: string;
}
