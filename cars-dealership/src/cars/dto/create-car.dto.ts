import { IsString, IsNumber, IsOptional } from 'class-validator';

import { Car } from '../entities/car.entity.js';

export class CreateCarDto {
    plate: string;
    brand: string;
    model: string
    year: number;
    price: number
    status: string;
    dealershipId?: number;
}
