export class PublicTenantConfigDto {
  logoUrl: string | null;
  themeColor: string | null;
  welcomeMessage: string | null;
  contactEmail: string | null;
  featuredHomes: string[] | null;
  showNewsletterSignup: boolean;
}
