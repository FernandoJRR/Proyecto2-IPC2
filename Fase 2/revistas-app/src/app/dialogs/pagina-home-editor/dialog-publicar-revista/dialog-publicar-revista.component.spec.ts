import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPublicarRevistaComponent } from './dialog-publicar-revista.component';

describe('DialogPublicarRevistaComponent', () => {
  let component: DialogPublicarRevistaComponent;
  let fixture: ComponentFixture<DialogPublicarRevistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPublicarRevistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPublicarRevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
