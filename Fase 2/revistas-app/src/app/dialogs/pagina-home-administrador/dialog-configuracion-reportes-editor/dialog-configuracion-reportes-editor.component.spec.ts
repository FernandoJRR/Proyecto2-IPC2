import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfiguracionReportesEditorComponent } from './dialog-configuracion-reportes-editor.component';

describe('DialogConfiguracionReportesEditorComponent', () => {
  let component: DialogConfiguracionReportesEditorComponent;
  let fixture: ComponentFixture<DialogConfiguracionReportesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfiguracionReportesEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfiguracionReportesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
