import { TestBed } from '@angular/core/testing';

import { PublicacionRevistasService } from './publicacion-revistas.service';

describe('PublicacionRevistasService', () => {
  let service: PublicacionRevistasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicacionRevistasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
