import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ClientService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() dto: CreateClientDto) {
    return this.clientService.create(dto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateClientDto>) {
    return this.clientService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
