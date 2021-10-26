import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComentarComponent } from './dialog-comentar.component';

describe('DialogComentarComponent', () => {
  let component: DialogComentarComponent;
  let fixture: ComponentFixture<DialogComentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogComentarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
