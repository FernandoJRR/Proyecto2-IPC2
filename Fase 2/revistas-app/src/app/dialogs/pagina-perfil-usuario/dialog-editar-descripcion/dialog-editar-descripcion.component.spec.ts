import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarDescripcionComponent } from './dialog-editar-descripcion.component';

describe('DialogEditarDescripcionComponent', () => {
  let component: DialogEditarDescripcionComponent;
  let fixture: ComponentFixture<DialogEditarDescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditarDescripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditarDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
