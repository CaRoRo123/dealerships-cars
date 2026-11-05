import { Module } from '@nestjs/common';
import { CarsService } from '../dealerships/entities/cars.service.js';
import { CarsController } from './cars.controller.js';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
