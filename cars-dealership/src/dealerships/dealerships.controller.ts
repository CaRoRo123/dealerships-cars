import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { DealershipsService } from './dealerships.service.js';
import { CreateDealershipDto } from './dto/create-dealership.dto.js';
import { UpdateDealershipDto } from './dto/update-dealership.dto.js';

@Controller('dealerships')
export class DealershipsController {
  constructor(private readonly dealershipsService: DealershipsService) {}

  @Post()
  create(@Body() createDealershipDto: CreateDealershipDto) {
    return this.dealershipsService.create(createDealershipDto);
  }

  @Get()
  findAll() {
    return this.dealershipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealershipsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDealershipDto: UpdateDealershipDto) {
    return this.dealershipsService.update(+id, updateDealershipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dealershipsService.remove(+id);
  }
}
