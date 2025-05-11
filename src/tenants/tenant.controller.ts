import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { UpdateTenantConfigDto } from './dto/update-tenant-config.dto';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  create(@Body() dto: CreateTenantDto) {
    return this.tenantService.createTenant(dto);
  }

  @Get()
  findAll() {
    return this.tenantService.findAll();
  }

  // @Patch(':id/config')
  // updateConfig(@Param('id') id: string, @Body() dto: UpdateTenantConfigDto) {
  //   return this.tenantService.updateConfig(id, dto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tenantService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
  //   return this.tenantService.update(id, dto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tenantService.remove(id);
  // }
}
