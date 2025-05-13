import { Tenant } from '../../tenants/entities/tenant.entity';

export class PublicUserDto {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  tenant?: Tenant;
}
