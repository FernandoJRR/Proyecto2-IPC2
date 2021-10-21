import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarFotoPerfilComponent } from './dialog-editar-foto-perfil.component';

describe('DialogEditarFotoPerfilComponent', () => {
  let component: DialogEditarFotoPerfilComponent;
  let fixture: ComponentFixture<DialogEditarFotoPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditarFotoPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditarFotoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
