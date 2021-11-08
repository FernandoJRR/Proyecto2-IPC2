import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgregarCostoHostingComponent } from './dialog-agregar-costo-hosting.component';

describe('DialogAgregarCostoHostingComponent', () => {
  let component: DialogAgregarCostoHostingComponent;
  let fixture: ComponentFixture<DialogAgregarCostoHostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAgregarCostoHostingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAgregarCostoHostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
