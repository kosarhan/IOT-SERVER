import { TestBed } from '@angular/core/testing';

import { TemperatureAlertService } from './temperature-alert.service';

describe('TemperatureAlertService', () => {
  let service: TemperatureAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemperatureAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
