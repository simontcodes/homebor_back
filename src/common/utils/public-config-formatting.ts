import { TenantConfig } from '../../tenantCongif/entities/tenant-config.entity';
import { PublicTenantConfigDto } from '../../tenantCongif/dto/public-tenant-config.dto';

export function toPublicTenantConfig(
  config: TenantConfig,
): PublicTenantConfigDto {
  return {
    logoUrl: config.logoUrl ?? null,
    faviconUrl: config.faviconUrl ?? null,
    heroText: config.heroText ?? null,
    heroImageUrl: config.heroImageUrl ?? null,
    websiteTitle: config.websiteTitle ?? null,
    themeColor: config.themeColor ?? null,
    welcomeMessage: config.welcomeMessage ?? null,
    contactEmail: config.contactEmail ?? null,
    showNewsletterSignup: config.showNewsletterSignup ?? false,
  };
}
