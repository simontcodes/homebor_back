import { UserRole } from '../enums/roles.enum';
import { Tenant } from 'src/tenants/entities/tenant.entity';


export class PublicUserDto {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: UserRole;
    tenant?: Tenant;
  }
  