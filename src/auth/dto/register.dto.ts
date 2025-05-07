import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsDate,
  IsEnum,
} from 'class-validator';
import { UserRole } from 'src/users/enums/roles.enum';

export class RegisterUserDto {
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(32, { message: 'Password must be no longer than 32 characters' })
  // Optional but recommended: enforce complexity
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
    message: 'Password must contain upper, lower case letters and numbers',
  })
  password: string;

  @IsNotEmpty({ message: 'First name is required' })
  @MaxLength(50, { message: 'First name is too long' })
  first_name: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @MaxLength(50, { message: 'Last name is too long' })
  last_name: string;

  @IsDate()
  date_of_birth: Date;

  @IsEnum(UserRole)
  role: UserRole
}
