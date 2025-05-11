import { Controller, Patch, Body, Param, Get, Post } from '@nestjs/common';

import { TenantConfigService } from './tenant-config.service';
import { UpdateTenantConfigDto } from './dto/update-tenant-config.dto';
import { toPublicTenantConfig } from 'src/common/utils/public-config-formatting';
import { CreateTenantConfigDto } from './dto/create-tenant-config.dto';

@Controller('tenant-config')
export class TenantConfigController {
  constructor(private readonly configService: TenantConfigService) {}

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    const config = await this.configService.findBySlug(slug);
    return toPublicTenantConfig(config);
  }

  @Post()
  create(@Body() dto: CreateTenantConfigDto) {
    return this.configService.create(dto);
  }

  @Patch(':tenantId')
  update(
    @Param('tenantId') tenantId: string,
    @Body() dto: UpdateTenantConfigDto,
  ) {
    return this.configService.updateByTenantId(tenantId, dto);
  }
}
