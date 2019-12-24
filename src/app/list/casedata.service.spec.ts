import { TestBed } from '@angular/core/testing';

import { CasedataService } from './casedata.service';

describe('CasedataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CasedataService = TestBed.get(CasedataService);
    expect(service).toBeTruthy();
  });
});
