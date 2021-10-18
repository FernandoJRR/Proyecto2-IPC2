import { TestBed } from '@angular/core/testing';

import { PaginaPerfilService } from './pagina-perfil.service';

describe('PaginaPerfilService', () => {
  let service: PaginaPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginaPerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
