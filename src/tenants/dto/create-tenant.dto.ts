  import { IsEmail, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength, Matches } from 'class-validator';

  
  export class CreateTenantDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50, {message: "Name is too long."})
    @MinLength(2, {message: "Name is too short."})
    @Matches(/^[a-zA-Z0-9\s'-]+$/, {
      message: 'Name can only contain letters, numbers, spaces, apostrophes, and dashes',
    })
    name: string;
  
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Slug must be lowercase and can only include letters, numbers, and dashes',
    })
    slug: string;
  
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100, { message: 'Email is too long' })
    email: string;
  
    @IsUUID()
    @IsNotEmpty()
    adminUserId: string;
  }
  