import { IsString, IsOptional, IsBoolean, IsEmail } from 'class-validator';

export class CreateTenantConfigDto {
  @IsString()
  tenantId: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  faviconUrl?: string;

  @IsOptional()
  @IsString()
  heroText?: string;

  @IsOptional()
  @IsString()
  heroImageUrl?: string;

  @IsOptional()
  @IsString()
  themeColor?: string;

  @IsOptional()
  @IsString()
  welcomeMessage?: string;

  @IsOptional()
  @IsString()
  websiteTitle?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  contactEmail?: string;

  @IsOptional()
  @IsBoolean()
  showNewsletterSignup?: boolean;
}
