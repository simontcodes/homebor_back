import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { HomeService } from './homes.service';
import { CreateHomeDto } from './dto/create-home.dto';

@Controller('homes')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Post()
  create(@Body() dto: CreateHomeDto) {
    return this.homeService.create(dto);
  }

  @Get()
  findAll() {
    return this.homeService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.homeService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeService.remove(id);
  }
}
