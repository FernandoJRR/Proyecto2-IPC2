import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuscribirseRevistaComponent } from './dialog-suscribirse-revista.component';

describe('DialogSuscribirseRevistaComponent', () => {
  let component: DialogSuscribirseRevistaComponent;
  let fixture: ComponentFixture<DialogSuscribirseRevistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSuscribirseRevistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSuscribirseRevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
