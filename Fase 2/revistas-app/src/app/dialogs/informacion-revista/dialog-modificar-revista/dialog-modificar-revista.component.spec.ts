import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModificarRevistaComponent } from './dialog-modificar-revista.component';

describe('DialogModificarRevistaComponent', () => {
  let component: DialogModificarRevistaComponent;
  let fixture: ComponentFixture<DialogModificarRevistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModificarRevistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModificarRevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
