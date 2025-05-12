import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tenant } from './entities/tenant.entity';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { UserModule } from 'src/users/user.module';
import { TenantRepository } from './repositories/tenant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant]), UserModule],
  providers: [TenantService, TenantRepository],
  controllers: [TenantController],
  exports: [TenantService],
})
export class TenantModule {}
