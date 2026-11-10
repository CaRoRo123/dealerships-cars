import { describe, expect, it } from 'vitest';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

describe('AppController', () => {
  it('returns the greeting from its service', () => {
    expect(new AppController(new AppService()).getHello()).toBe('Hello World!');
  });
});
