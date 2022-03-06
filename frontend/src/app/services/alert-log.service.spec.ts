import { TestBed } from '@angular/core/testing';

import { AlertLogService } from './alert-log.service';

describe('AlertLogService', () => {
  let service: AlertLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
