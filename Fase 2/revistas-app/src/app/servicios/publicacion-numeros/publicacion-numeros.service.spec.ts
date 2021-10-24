import { TestBed } from '@angular/core/testing';

import { PublicacionNumerosService } from './publicacion-numeros.service';

describe('PublicacionNumerosService', () => {
  let service: PublicacionNumerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicacionNumerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
