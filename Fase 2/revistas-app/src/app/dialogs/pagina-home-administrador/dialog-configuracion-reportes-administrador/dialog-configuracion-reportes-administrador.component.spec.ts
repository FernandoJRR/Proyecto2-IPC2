import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfiguracionReportesAdministradorComponent } from './dialog-configuracion-reportes-administrador.component';

describe('DialogConfiguracionReportesAdministradorComponent', () => {
  let component: DialogConfiguracionReportesAdministradorComponent;
  let fixture: ComponentFixture<DialogConfiguracionReportesAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfiguracionReportesAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfiguracionReportesAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
