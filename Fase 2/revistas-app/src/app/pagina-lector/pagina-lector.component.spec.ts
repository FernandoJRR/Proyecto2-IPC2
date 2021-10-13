import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaLectorComponent } from './pagina-lector.component';

describe('PaginaLectorComponent', () => {
  let component: PaginaLectorComponent;
  let fixture: ComponentFixture<PaginaLectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaLectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaLectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
