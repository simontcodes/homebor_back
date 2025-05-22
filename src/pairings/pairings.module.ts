import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PairingService } from './pairings.service';
import { PairingController } from './pairings.controller';
import { PairingRepository } from './repositories/pairings.repository';
import { Home } from '../homes/entities/home.entity';
import { Client } from '../clients/entities/client.entity';
import { Pairing } from './entities/pairing.entity';
import { ClientModule } from 'src/clients/clients.module';
import { HomeModule } from 'src/homes/homes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pairing, Home, Client]),
    ClientModule,
    HomeModule,
  ],
  controllers: [PairingController],
  providers: [PairingService, PairingRepository],
})
export class PairingsModule {}
