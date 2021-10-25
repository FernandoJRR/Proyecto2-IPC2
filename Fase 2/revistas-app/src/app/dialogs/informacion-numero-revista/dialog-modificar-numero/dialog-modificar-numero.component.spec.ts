import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModificarNumeroComponent } from './dialog-modificar-numero.component';

describe('DialogModificarNumeroComponent', () => {
  let component: DialogModificarNumeroComponent;
  let fixture: ComponentFixture<DialogModificarNumeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModificarNumeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModificarNumeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
