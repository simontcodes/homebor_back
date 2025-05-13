import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tenant } from './entities/tenant.entity';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { UserModule } from '../users/user.module';
import { TenantRepository } from './repositories/tenant.repository';
import { RoleModule } from '../RBAC/role/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant]), UserModule, RoleModule],
  providers: [TenantService, TenantRepository],
  controllers: [TenantController],
  exports: [TenantService],
})
export class TenantModule {}
