import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPublicarNumeroComponent } from './dialog-publicar-numero.component';

describe('DialogPublicarNumeroComponent', () => {
  let component: DialogPublicarNumeroComponent;
  let fixture: ComponentFixture<DialogPublicarNumeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPublicarNumeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPublicarNumeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
