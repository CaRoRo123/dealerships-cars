import { describe, expect, it, vi } from 'vitest';
import { CarsController } from './cars.controller.js';
import type { CarsService } from './cars.service.js';

describe('CarsController CRUD routes', () => {
  const service = {
    create: vi.fn(), findAll: vi.fn(), findOne: vi.fn(), update: vi.fn(), remove: vi.fn(),
  };
  const controller = new CarsController(service as unknown as CarsService);

  it('forwards create and list calls to the service', () => {
    const dto = { plate: 'ABC123' };
    service.create.mockReturnValue('created');
    service.findAll.mockReturnValue(['car']);
    expect(controller.create(dto as never)).toBe('created');
    expect(controller.findAll()).toEqual(['car']);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('converts route ids to numbers for read, update, and delete calls', () => {
    service.findOne.mockReturnValue('car');
    service.update.mockReturnValue('updated');
    service.remove.mockReturnValue('removed');
    expect(controller.findOne('12')).toBe('car');
    expect(controller.update('12', { status: 'reserved' } as never)).toBe('updated');
    expect(controller.remove('12')).toBe('removed');
    expect(service.findOne).toHaveBeenCalledWith(12);
    expect(service.update).toHaveBeenCalledWith(12, { status: 'reserved' });
    expect(service.remove).toHaveBeenCalledWith(12);
  });
});
