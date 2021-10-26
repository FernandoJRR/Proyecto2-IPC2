import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgregarEtiquetaComponent } from './dialog-agregar-etiqueta.component';

describe('DialogAgregarEtiquetaComponent', () => {
  let component: DialogAgregarEtiquetaComponent;
  let fixture: ComponentFixture<DialogAgregarEtiquetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAgregarEtiquetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAgregarEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
