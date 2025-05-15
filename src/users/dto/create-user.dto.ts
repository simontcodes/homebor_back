import {
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

import { User } from '../entities/user.entity';
import { UserRole } from '../enums/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  roleId: string;

  @IsDate()
  date_of_birth: Date;
}
