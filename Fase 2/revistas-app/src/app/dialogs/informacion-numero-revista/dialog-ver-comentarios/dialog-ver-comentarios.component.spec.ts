import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerComentariosComponent } from './dialog-ver-comentarios.component';

describe('DialogVerComentariosComponent', () => {
  let component: DialogVerComentariosComponent;
  let fixture: ComponentFixture<DialogVerComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVerComentariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVerComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
