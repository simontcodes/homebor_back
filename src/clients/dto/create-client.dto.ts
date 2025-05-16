import {
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
  IsPhoneNumber,
  IsIn,
  IsNotEmpty,
  IsBoolean,
  IsUUID,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsDateString()
  @IsNotEmpty()
  date_of_birth: string;

  @IsIn(['male', 'female', 'other'])
  gender: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  origin_language: string;

  @IsString()
  @IsNotEmpty()
  country_of_residence: string;

  @IsOptional()
  @IsString()
  agency?: string;

  @IsOptional()
  @IsString()
  school?: string;

  @IsIn(['single', 'shared'])
  accommodation_type: string;

  @IsIn(['3_meals', '2_meals', 'no_meals'])
  meal_plan: string;

  @IsOptional()
  house_preference?: Record<string, any>;

  @IsOptional()
  health_info?: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  emergency_contact_name: string;

  @IsPhoneNumber()
  emergency_contact_phone: string;

  @IsUUID()
  @IsNotEmpty()
  tenantId: string;

  @IsBoolean()
  @IsOptional()
  approved?: boolean;

  @IsUUID()
  @IsOptional()
  approved_by?: string;

  @IsDateString()
  @IsOptional()
  approved_at?: string;
}
