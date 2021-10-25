import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModificarEstadoMeGustaComponent } from './dialog-modificar-estado-me-gusta.component';

describe('DialogModificarEstadoMeGustaComponent', () => {
  let component: DialogModificarEstadoMeGustaComponent;
  let fixture: ComponentFixture<DialogModificarEstadoMeGustaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModificarEstadoMeGustaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModificarEstadoMeGustaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
