import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaSuscripcionesComponent } from './pagina-suscripciones.component';

describe('PaginaSuscripcionesComponent', () => {
  let component: PaginaSuscripcionesComponent;
  let fixture: ComponentFixture<PaginaSuscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaSuscripcionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaSuscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
