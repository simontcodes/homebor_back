import { Controller, Patch, Body, Param, Get, Post, UseGuards } from '@nestjs/common';

import { TenantConfigService } from './tenant-config.service';
import { UpdateTenantConfigDto } from './dto/update-tenant-config.dto';
import { toPublicTenantConfig } from '../common/utils/public-config-formatting'
import { CreateTenantConfigDto } from './dto/create-tenant-config.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Public } from '../auth/decorators/public.decorator';

@Controller('tenant-config')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard) 
export class TenantConfigController {
  constructor(private readonly configService: TenantConfigService) {}

  @Get('by-slug/:slug')
  @Public()
  async getBySlug(@Param('slug') slug: string) {
    const config = await this.configService.findBySlug(slug);
    return toPublicTenantConfig(config);
  }

  @Post()
  @Roles('admin', 'super_admin')
  @Permissions('config:update')
  create(@Body() dto: CreateTenantConfigDto) {
    return this.configService.create(dto);
  }

  @Patch(':tenantId')
  @Roles('admin', 'super_admin')
  @Permissions('config:update')
  update(
    @Param('tenantId') tenantId: string,
    @Body() dto: UpdateTenantConfigDto,
  ) {
    return this.configService.updateByTenantId(tenantId, dto);
  }
}
