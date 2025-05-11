import { IsOptional, IsString, IsBoolean, IsArray } from 'class-validator';

export class UpdateTenantConfigDto {
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  themeColor?: string;

  @IsOptional()
  @IsString()
  welcomeMessage?: string;

  @IsOptional()
  @IsString()
  contactEmail?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  featuredHomes?: string[];

  @IsOptional()
  @IsBoolean()
  showNewsletterSignup?: boolean;
}