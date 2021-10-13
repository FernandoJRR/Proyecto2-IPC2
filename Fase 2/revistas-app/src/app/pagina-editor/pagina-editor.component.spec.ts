import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaEditorComponent } from './pagina-editor.component';

describe('PaginaEditorComponent', () => {
  let component: PaginaEditorComponent;
  let fixture: ComponentFixture<PaginaEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
