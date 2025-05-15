import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Home } from './entities/home.entity';
import { HomeRepository } from './repositories/homes.repository';
import { HomeService } from './homes.service';
import { HomeController } from './homes.controller';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Home]), UserModule],
  providers: [HomeRepository, HomeService],
  controllers: [HomeController],
})
export class HomeModule {}
