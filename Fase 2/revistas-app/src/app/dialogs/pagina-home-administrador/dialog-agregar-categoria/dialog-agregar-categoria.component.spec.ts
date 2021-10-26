import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgregarCategoriaComponent } from './dialog-agregar-categoria.component';

describe('DialogAgregarCategoriaComponent', () => {
  let component: DialogAgregarCategoriaComponent;
  let fixture: ComponentFixture<DialogAgregarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAgregarCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAgregarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
