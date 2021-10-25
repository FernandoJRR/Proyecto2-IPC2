import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionNumeroRevistaComponent } from './informacion-numero-revista.component';

describe('InformacionNumeroRevistaComponent', () => {
  let component: InformacionNumeroRevistaComponent;
  let fixture: ComponentFixture<InformacionNumeroRevistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionNumeroRevistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionNumeroRevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
