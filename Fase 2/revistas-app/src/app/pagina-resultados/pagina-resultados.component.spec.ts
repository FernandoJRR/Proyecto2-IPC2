import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaResultadosComponent } from './pagina-resultados.component';

describe('PaginaResultadosComponent', () => {
  let component: PaginaResultadosComponent;
  let fixture: ComponentFixture<PaginaResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaResultadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
