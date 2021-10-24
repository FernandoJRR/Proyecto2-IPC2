import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaHomeEditorComponent } from './pagina-home-editor.component';

describe('PaginaHomeEditorComponent', () => {
  let component: PaginaHomeEditorComponent;
  let fixture: ComponentFixture<PaginaHomeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaHomeEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaHomeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
