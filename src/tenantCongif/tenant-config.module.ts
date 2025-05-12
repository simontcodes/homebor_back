import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantConfig } from './entities/tenant-config.entity';
import { TenantConfigService } from './tenant-config.service';
import { TenantConfigController } from './tenant-config.controller';
import { TenantConfigRepository } from './repositories/tenant-config.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TenantConfig])],
  controllers: [TenantConfigController],
  providers: [TenantConfigService, TenantConfigRepository],
  exports: [TenantConfigService],
})
export class TenantConfigModule {}
