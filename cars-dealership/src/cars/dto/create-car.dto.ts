//importa lo usado para que año y precio esten en rangoes especificos
import { IsEnum, IsInt, IsPositive, Min, Max } from 'class-validator';
import { Car } from '../entities/car.entity.js';

export enum CarStatus {
    AVAILABLE = 'available',
    SOLD = 'sold',
    RESERVED = 'reserved',
}


export class CreateCarDto {
    plate: string;
    brand: string;
    model: string

    @IsInt({message: 'El año debe ser un número entero'})
    @Min(1990, {message: 'El año debe ser mayor o igual a 1990'})
    @Max(2027, {message: 'El año debe ser menor o igual a 2027'})
    year: number;

    @IsPositive()
    price: number;

    @IsEnum(CarStatus)
    status: CarStatus;
    dealershipId?: number;
}
