import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModificarEstadoSuscripcionesComponent } from './dialog-modificar-estado-suscripciones.component';

describe('DialogModificarEstadoSuscripcionesComponent', () => {
  let component: DialogModificarEstadoSuscripcionesComponent;
  let fixture: ComponentFixture<DialogModificarEstadoSuscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModificarEstadoSuscripcionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModificarEstadoSuscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
