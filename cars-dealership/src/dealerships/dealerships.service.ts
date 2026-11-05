import { Injectable } from '@nestjs/common';
import { CreateDealershipDto } from './dto/create-dealership.dto.js';
import { UpdateDealershipDto } from './dto/update-dealership.dto.js';

@Injectable()
export class DealershipsService {
  create(createDealershipDto: CreateDealershipDto) {
    return 'This action adds a new dealership';
  }

  findAll() {
    return `This action returns all dealerships`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dealership`;
  }

  update(id: number, updateDealershipDto: UpdateDealershipDto) {
    return `This action updates a #${id} dealership`;
  }

  remove(id: number) {
    return `This action removes a #${id} dealership`;
  }
}
