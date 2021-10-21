import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarEtiquetasComponent } from './dialog-editar-etiquetas.component';

describe('DialogEditarEtiquetasComponent', () => {
  let component: DialogEditarEtiquetasComponent;
  let fixture: ComponentFixture<DialogEditarEtiquetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditarEtiquetasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditarEtiquetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
