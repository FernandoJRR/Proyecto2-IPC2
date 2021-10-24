import { TestBed } from '@angular/core/testing';

import { ModificacionRevistasService } from './modificacion-revistas.service';

describe('ModificacionRevistasService', () => {
  let service: ModificacionRevistasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificacionRevistasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
