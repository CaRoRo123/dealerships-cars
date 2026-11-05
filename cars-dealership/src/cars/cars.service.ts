import { Injectable } from '@nestjs/common';
import { CreateCarDto } from '../../cars/dto/create-car.dto.js';
import { UpdateCarDto } from '../../cars/dto/update-car.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../../cars/entities/car.entity.js';
import { Dealership } from './dealership.entity.js';
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


  create(createCarDto: CreateCarDto) {
    const duplicado = this.carRepository.findOne({ where: { plate: createCarDto.plate } });
    if (duplicado) {
      throw new ConflictException('Ya existe un coche con esa matrícula');
    }
    const car = this.carRepository.create(createCarDto);
    return this.carRepository.save(car);
  }

  findAll() {
    return this.carRepository.find();
  }

  findOne(id: number) {
    const car = this.carRepository.findOne({ where: { id } });
    if (!car) {
      throw new NotFoundException(`No se encontró un coche con el ID ${id}`);
    }
    return car;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
