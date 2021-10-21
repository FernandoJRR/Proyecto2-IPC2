import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarGeneroComponent } from './dialog-editar-genero.component';

describe('DialogEditarGeneroComponent', () => {
  let component: DialogEditarGeneroComponent;
  let fixture: ComponentFixture<DialogEditarGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditarGeneroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditarGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
