import { TestBed } from '@angular/core/testing';

import { VoorspellingHelperService } from './voorspelling-helper.service';

describe('VoorspellingHelperService', () => {
  let service: VoorspellingHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoorspellingHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
