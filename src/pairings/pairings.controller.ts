import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PairingService } from './pairings.service';
import { CreatePairingDto } from './dto/create-pairing.dto';

@Controller('pairings')
export class PairingController {
  constructor(private readonly pairingService: PairingService) {}

  @Post()
  create(@Body() dto: CreatePairingDto) {
    return this.pairingService.create(dto);
  }

  @Get()
  findAll() {
    return this.pairingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pairingService.findById(id);
  }
}
