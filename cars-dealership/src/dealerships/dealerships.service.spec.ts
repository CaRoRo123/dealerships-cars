import { BadRequestException, NotFoundException } from '@nestjs/common';
import type { Repository } from 'typeorm';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Car } from '../cars/entities/car.entity.js';
import { Dealership } from './entities/dealership.entity.js';
import { CreateDealershipDto } from './dto/create-dealership.dto.js';
import { UpdateDealershipDto } from './dto/update-dealership.dto.js';
import { DealershipsService } from './dealerships.service.js';

describe('DealershipsService CRUD', () => {
  let service: DealershipsService;
  let dealerships: Pick<Repository<Dealership>, 'create' | 'save' | 'find' | 'findOne' | 'update' | 'remove'>;
  let cars: Pick<Repository<Car>, 'find'>;
  let dealership: Dealership;

  beforeEach(() => {
    dealership = { id: 4, name: 'Central', city: 'Bogotá', active: true, cars: [] } as Dealership;
    dealerships = {
      create: vi.fn(), save: vi.fn(), find: vi.fn(), findOne: vi.fn(), update: vi.fn(), remove: vi.fn(),
    };
    cars = { find: vi.fn() };
    service = new DealershipsService(dealerships as Repository<Dealership>, cars as Repository<Car>);
  });

  it('creates a dealership', async () => {
    const dto = { name: 'Central', city: 'Bogotá', active: true } as CreateDealershipDto;
    vi.mocked(dealerships.create).mockReturnValue(dealership);
    vi.mocked(dealerships.save).mockResolvedValue(dealership);
    await expect(service.create(dto)).resolves.toBe(dealership);
    expect(dealerships.create).toHaveBeenCalledWith(dto);
    expect(dealerships.save).toHaveBeenCalledWith(dealership);
  });

  it('lists dealerships and returns one by id', async () => {
    vi.mocked(dealerships.find).mockResolvedValue([dealership]);
    vi.mocked(dealerships.findOne).mockResolvedValue(dealership);
    await expect(service.findAll()).resolves.toEqual([dealership]);
    await expect(service.findOne(4)).resolves.toBe(dealership);
  });

  it('throws when a dealership does not exist', async () => {
    vi.mocked(dealerships.findOne).mockResolvedValue(null);
    await expect(service.findOne(99)).rejects.toBeInstanceOf(NotFoundException);
    await expect(service.findCars(99)).rejects.toBeInstanceOf(NotFoundException);
    await expect(service.update(99, {} as UpdateDealershipDto)).rejects.toBeInstanceOf(NotFoundException);
    await expect(service.remove(99)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('lists cars belonging to a dealership', async () => {
    const car = { id: 1, dealershipId: 4 } as Car;
    vi.mocked(dealerships.findOne).mockResolvedValue(dealership);
    vi.mocked(cars.find).mockResolvedValue([car]);
    await expect(service.findCars(4)).resolves.toEqual([car]);
    expect(cars.find).toHaveBeenCalledWith({ where: { dealershipId: 4 } });
  });

  it('updates a dealership after confirming it exists', async () => {
    const dto = { city: 'Medellín' } as UpdateDealershipDto;
    vi.mocked(dealerships.findOne).mockResolvedValue(dealership);
    const result = { affected: 1 };
    vi.mocked(dealerships.update).mockResolvedValue(result);
    await expect(service.update(4, dto)).resolves.toBe(result);
    expect(dealerships.update).toHaveBeenCalledWith(4, dto);
  });

  it('removes an empty dealership and rejects one with associated cars', async () => {
    vi.mocked(dealerships.findOne).mockResolvedValue(dealership);
    vi.mocked(dealerships.remove).mockResolvedValue(dealership);
    await expect(service.remove(4)).resolves.toBe(dealership);
    expect(dealerships.remove).toHaveBeenCalledWith(dealership);

    vi.mocked(dealerships.findOne).mockResolvedValue({ ...dealership, cars: [{} as Car] });
    await expect(service.remove(4)).rejects.toBeInstanceOf(BadRequestException);
  });
});
