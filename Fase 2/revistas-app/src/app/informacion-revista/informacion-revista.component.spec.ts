import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionRevistaComponent } from './informacion-revista.component';

describe('InformacionRevistaComponent', () => {
  let component: InformacionRevistaComponent;
  let fixture: ComponentFixture<InformacionRevistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionRevistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionRevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
