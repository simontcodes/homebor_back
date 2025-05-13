import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from './entities/role.entity';
import { Permission } from '../permissions/permission.entity';
import { RoleRepository } from './repositories/roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  providers: [RoleRepository],
  exports: [RoleRepository],
})
export class RoleModule {}
