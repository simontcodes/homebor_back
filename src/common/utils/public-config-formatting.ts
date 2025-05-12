import { TenantConfig } from '../../tenantCongif/entities/tenant-config.entity';
import { PublicTenantConfigDto } from '../../tenantCongif/dto/public-tenant-config.dto';

export function toPublicTenantConfig(
  config: TenantConfig,
): PublicTenantConfigDto {
  return {
    logoUrl: config.logoUrl ?? null,
    themeColor: config.themeColor ?? null,
    welcomeMessage: config.welcomeMessage ?? null,
    contactEmail: config.contactEmail ?? null,
    featuredHomes: config.featuredHomes ?? null,
    showNewsletterSignup: config.showNewsletterSignup ?? false,
  };
}
