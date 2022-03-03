import { TestBed } from '@angular/core/testing';

import { HumidityAlertService } from './humidity-alert.service';

describe('HumidityAlertService', () => {
  let service: HumidityAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HumidityAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
