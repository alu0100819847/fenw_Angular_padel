import { TestBed } from '@angular/core/testing';

import { HttpBDService } from './http-bd.service';

describe('HttpBDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpBDService = TestBed.get(HttpBDService);
    expect(service).toBeTruthy();
  });
});
