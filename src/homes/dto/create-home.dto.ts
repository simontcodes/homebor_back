import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateHomeDto {
  @IsUUID()
  @IsString()
  homeProviderId: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsBoolean()
  pets: boolean;

  @IsOptional()
  @IsString()
  age_preference?: string;

  @IsOptional()
  @IsString()
  gender_preference?: string;

  @IsBoolean()
  food_service: boolean;

  @IsBoolean()
  special_diet: boolean;
}
