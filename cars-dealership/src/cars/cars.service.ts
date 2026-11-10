import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto.js';
import { UpdateCarDto } from './dto/update-car.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity.js';
import { Dealership } from '../dealerships/entities/dealership.entity.js';
import { ConflictException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(Dealership)
    private readonly dealershipRepository: Repository<Dealership>
  ) {}


  async create(createCarDto: CreateCarDto) {
    const duplicado = await this.carRepository.findOne({ where: { plate: createCarDto.plate } });
    if (duplicado) {
      throw new ConflictException('Ya existe un coche con esa matrícula');
    }
    const dealership = await this.dealershipRepository.findOne({ where: { id: createCarDto.dealershipId } });
    if (!dealership) {
      throw new NotFoundException(`No se encontró un concesionario con el ID ${createCarDto.dealershipId}`);
    }
    if (!dealership.active) {
      throw new BadRequestException(`El concesionario con el ID ${createCarDto.dealershipId} no está activo`);
    }

    const car = this.carRepository.create(createCarDto);
    return this.carRepository.save(car);
  }

  async findAll() {
    return this.carRepository.find();
  }

  async findOne(id: number) {
    const car = await this.carRepository.findOne({ where: { id } });
    if (!car) {
      throw new NotFoundException(`No se encontró un coche con el ID ${id}`);
    }
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.findOne(id);
    if (!car) {
      throw new NotFoundException(`No se encontró un coche con el ID ${id}`);
    }
    const status = updateCarDto.status?.toLowerCase();
    if (status === 'sold') {
      throw new BadRequestException(`No se puede cambiar el estado a 'sold' directamente. Debe ser reservado primero.`);
    }
    Object.assign(car, updateCarDto);
    return this.carRepository.save(car);
  }

  async remove(id: number) {
    const car = await this.findOne(id);
    return this.carRepository.remove(car);
  }
}
