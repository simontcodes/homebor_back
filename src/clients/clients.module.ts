import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from './entities/client.entity';
import { ClientRepository } from './repositories/clients.repository';
import { ClientService } from './clients.service';
import { ClientController } from './clients.controller';
import { UserModule } from 'src/users/user.module';
import { TenantModule } from 'src/tenants/tenant.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), UserModule, TenantModule],
  controllers: [ClientController],
  providers: [ClientRepository, ClientService],
})
export class ClientModule {}
