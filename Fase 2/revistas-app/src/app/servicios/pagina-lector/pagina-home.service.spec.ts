import { TestBed } from '@angular/core/testing';

import { PaginaHomeService } from './pagina-home.service';

describe('PaginaHomeService', () => {
  let service: PaginaHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginaHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
