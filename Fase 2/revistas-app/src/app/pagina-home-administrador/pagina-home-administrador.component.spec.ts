import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaHomeAdministradorComponent } from './pagina-home-administrador.component';

describe('PaginaHomeAdministradorComponent', () => {
  let component: PaginaHomeAdministradorComponent;
  let fixture: ComponentFixture<PaginaHomeAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaHomeAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaHomeAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
