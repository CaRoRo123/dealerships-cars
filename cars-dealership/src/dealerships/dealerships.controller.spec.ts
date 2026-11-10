import { describe, expect, it, vi } from 'vitest';
import { DealershipsController } from './dealerships.controller.js';
import type { DealershipsService } from './dealerships.service.js';

describe('DealershipsController CRUD routes', () => {
  const service = {
    create: vi.fn(), findAll: vi.fn(), findOne: vi.fn(), findCars: vi.fn(), update: vi.fn(), remove: vi.fn(),
  };
  const controller = new DealershipsController(service as unknown as DealershipsService);

  it('forwards create and list calls to the service', () => {
    const dto = { name: 'Central' };
    service.create.mockReturnValue('created');
    service.findAll.mockReturnValue(['dealership']);
    expect(controller.create(dto as never)).toBe('created');
    expect(controller.findAll()).toEqual(['dealership']);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('converts route ids to numbers and forwards read, cars, update, and delete calls', () => {
    service.findOne.mockReturnValue('dealership');
    service.findCars.mockReturnValue(['car']);
    service.update.mockReturnValue('updated');
    service.remove.mockReturnValue('removed');
    expect(controller.findOne('4')).toBe('dealership');
    expect(controller.findCars('4')).toEqual(['car']);
    expect(controller.update('4', { city: 'Cali' } as never)).toBe('updated');
    expect(controller.remove('4')).toBe('removed');
    expect(service.findOne).toHaveBeenCalledWith(4);
    expect(service.findCars).toHaveBeenCalledWith(4);
    expect(service.update).toHaveBeenCalledWith(4, { city: 'Cali' });
    expect(service.remove).toHaveBeenCalledWith(4);
  });
});
