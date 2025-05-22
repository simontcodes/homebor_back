import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Home } from './entities/home.entity';
import { HomeRepository } from './repositories/homes.repository';
import { HomeService } from './homes.service';
import { HomeController } from './homes.controller';
import { UserModule } from 'src/users/user.module';
import { TenantModule } from 'src/tenants/tenant.module';

@Module({
  imports: [TypeOrmModule.forFeature([Home]), UserModule, TenantModule],
  providers: [HomeRepository, HomeService],
  controllers: [HomeController],
  exports: [HomeRepository, HomeService],
})
export class HomeModule {}
