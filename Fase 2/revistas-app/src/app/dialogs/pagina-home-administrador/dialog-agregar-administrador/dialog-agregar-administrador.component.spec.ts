import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgregarAdministradorComponent } from './dialog-agregar-administrador.component';

describe('DialogAgregarAdministradorComponent', () => {
  let component: DialogAgregarAdministradorComponent;
  let fixture: ComponentFixture<DialogAgregarAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAgregarAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAgregarAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
