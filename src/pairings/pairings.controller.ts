import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PairingService } from './pairings.service';
import { CreatePairingDto } from './dto/create-pairing.dto';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import type { AuthUser as AuthUserShape } from 'src/auth/jwt.strategy';

@Controller('pairings')
export class PairingController {
  constructor(private readonly pairingService: PairingService) {}

  @Post()
  create(@Body() dto: CreatePairingDto, @AuthUser() user: AuthUserShape) {
    return this.pairingService.create(dto, user);
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
