import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarHobbiesComponent } from './dialog-editar-hobbies.component';

describe('DialogEditarHobbiesComponent', () => {
  let component: DialogEditarHobbiesComponent;
  let fixture: ComponentFixture<DialogEditarHobbiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditarHobbiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditarHobbiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
