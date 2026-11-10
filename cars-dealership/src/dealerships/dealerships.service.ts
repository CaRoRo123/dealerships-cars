import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDealershipDto } from './dto/create-dealership.dto.js';
import { UpdateDealershipDto } from './dto/update-dealership.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Dealership } from './entities/dealership.entity.js';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { Car } from '../cars/entities/car.entity.js';
import { inject } from 'vitest';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class DealershipsService {
  constructor(
    @InjectRepository(Dealership)
    private readonly dealershipRepository: Repository<Dealership>,
    
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>
  ) {}

  


  create(createDealershipDto: CreateDealershipDto) {
    const dealership = this.dealershipRepository.create(createDealershipDto);
    return this.dealershipRepository.save(dealership);
  }

  findAll() {       
    return this.dealershipRepository.find();
  }

  async findOne(id: number) {
    const dealership = await this.dealershipRepository.findOne({ where: { id } });
    if (!dealership) {
      throw new NotFoundException(`No se encontró un concesionario con el ID ${id}`);
    }
    return dealership;
    }

  async findCars(id: number) {
    const dealership = await this.dealershipRepository.findOne({ where: { id } });
    if (!dealership) {
      throw new NotFoundException(`No se encontró un concesionario con el ID ${id}`);
    }
    return this.carRepository.find({ where: { dealershipId: id } });
  }

  async update(id: number, updateDealershipDto: UpdateDealershipDto) {
    const dealership = await this.dealershipRepository.findOne({ where: { id } });
    if (!dealership) {
      throw new NotFoundException(`No se encontró un concesionario con el ID ${id}`);
    }
    return this.dealershipRepository.update(id, updateDealershipDto);
  }

  async remove(id: number) {
    const dealership = await this.dealershipRepository.findOne({ where: { id } });
    if (!dealership) {
      throw new NotFoundException(`No se encontró un concesionario con el ID ${id}`);
    }
    if (dealership.cars && dealership.cars.length > 0) {
      throw new BadRequestException(`No se puede eliminar el concesionario con ID ${id} porque tiene autos asociados.`);
    }
    
  }
}
