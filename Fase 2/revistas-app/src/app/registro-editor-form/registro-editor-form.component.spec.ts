import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEditorFormComponent } from './registro-editor-form.component';

describe('RegistroEditorFormComponent', () => {
  let component: RegistroEditorFormComponent;
  let fixture: ComponentFixture<RegistroEditorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroEditorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEditorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
