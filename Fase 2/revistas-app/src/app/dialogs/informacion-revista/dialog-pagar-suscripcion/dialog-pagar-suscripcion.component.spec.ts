import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPagarSuscripcionComponent } from './dialog-pagar-suscripcion.component';

describe('DialogPagarSuscripcionComponent', () => {
  let component: DialogPagarSuscripcionComponent;
  let fixture: ComponentFixture<DialogPagarSuscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPagarSuscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPagarSuscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
