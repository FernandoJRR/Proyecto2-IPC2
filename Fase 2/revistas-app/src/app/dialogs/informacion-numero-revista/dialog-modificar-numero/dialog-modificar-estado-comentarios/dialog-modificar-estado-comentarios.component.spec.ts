import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModificarEstadoComentariosComponent } from './dialog-modificar-estado-comentarios.component';

describe('DialogModificarEstadoComentariosComponent', () => {
  let component: DialogModificarEstadoComentariosComponent;
  let fixture: ComponentFixture<DialogModificarEstadoComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModificarEstadoComentariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModificarEstadoComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
