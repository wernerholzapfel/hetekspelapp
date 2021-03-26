import { TestBed } from '@angular/core/testing';

import { KnockoutService } from './knockout.service';

describe('KnockoutService', () => {
  let service: KnockoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnockoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
