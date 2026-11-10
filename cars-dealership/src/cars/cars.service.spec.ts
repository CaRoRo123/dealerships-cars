import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import type { Repository } from 'typeorm';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Dealership } from '../dealerships/entities/dealership.entity.js';
import { CreateCarDto } from './dto/create-car.dto.js';
import { UpdateCarDto } from './dto/update-car.dto.js';
import { Car } from './entities/car.entity.js';
import { CarsService } from './cars.service.js';

describe('CarsService CRUD', () => {
  let service: CarsService;
  let cars: Pick<Repository<Car>, 'find' | 'findOne' | 'create' | 'save' | 'remove'>;
  let dealerships: Pick<Repository<Dealership>, 'findOne'>;

  const car = { id: 1, plate: 'ABC123', brand: 'Toyota', model: 'Corolla', dealershipId: 4 } as Car;
  const dealership = { id: 4, active: true } as Dealership;

  beforeEach(() => {
    cars = {
      find: vi.fn(), findOne: vi.fn(), create: vi.fn(), save: vi.fn(), remove: vi.fn(),
    };
    dealerships = { findOne: vi.fn() };
    service = new CarsService(cars as Repository<Car>, dealerships as Repository<Dealership>);
  });

  it('creates a car for an active dealership', async () => {
    const dto = { plate: 'ABC123', dealershipId: 4 } as CreateCarDto;
    vi.mocked(cars.findOne).mockResolvedValue(null);
    vi.mocked(dealerships.findOne).mockResolvedValue(dealership);
    vi.mocked(cars.create).mockReturnValue(car);
    vi.mocked(cars.save).mockResolvedValue(car);

    await expect(service.create(dto)).resolves.toBe(car);
    expect(cars.create).toHaveBeenCalledWith(dto);
    expect(cars.save).toHaveBeenCalledWith(car);
  });

  it('rejects duplicate plates, missing dealerships, and inactive dealerships', async () => {
    const dto = { plate: 'ABC123', dealershipId: 4 } as CreateCarDto;
    vi.mocked(cars.findOne).mockResolvedValue(car);
    await expect(service.create(dto)).rejects.toBeInstanceOf(ConflictException);

    vi.mocked(cars.findOne).mockResolvedValue(null);
    vi.mocked(dealerships.findOne).mockResolvedValue(null);
    await expect(service.create(dto)).rejects.toBeInstanceOf(NotFoundException);

    vi.mocked(dealerships.findOne).mockResolvedValue({ ...dealership, active: false });
    await expect(service.create(dto)).rejects.toBeInstanceOf(BadRequestException);
  });

  it('lists cars and finds one car by id', async () => {
    vi.mocked(cars.find).mockResolvedValue([car]);
    vi.mocked(cars.findOne).mockResolvedValue(car);
    await expect(service.findAll()).resolves.toEqual([car]);
    await expect(service.findOne(1)).resolves.toBe(car);
    expect(cars.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('throws when the requested car does not exist', async () => {
    vi.mocked(cars.findOne).mockResolvedValue(null);
    await expect(service.findOne(99)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('updates a car and prevents setting its status to sold directly', async () => {
    vi.mocked(cars.findOne).mockResolvedValue(car);
    vi.mocked(cars.save).mockResolvedValue(car);
    await expect(service.update(1, { status: 'reserved' } as UpdateCarDto)).resolves.toBe(car);
    expect(car.status).toBe('reserved');
    await expect(service.update(1, { status: 'SOLD' } as UpdateCarDto)).rejects.toBeInstanceOf(BadRequestException);
  });

  it('removes a car', async () => {
    vi.mocked(cars.findOne).mockResolvedValue(car);
    vi.mocked(cars.remove).mockResolvedValue(car);
    await expect(service.remove(1)).resolves.toBe(car);
    expect(cars.remove).toHaveBeenCalledWith(car);
  });
});
