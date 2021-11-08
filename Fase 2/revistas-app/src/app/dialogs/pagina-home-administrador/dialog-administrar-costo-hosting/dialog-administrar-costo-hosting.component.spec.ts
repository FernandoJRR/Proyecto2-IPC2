import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdministrarCostoHostingComponent } from './dialog-administrar-costo-hosting.component';

describe('DialogAdministrarCostoHostingComponent', () => {
  let component: DialogAdministrarCostoHostingComponent;
  let fixture: ComponentFixture<DialogAdministrarCostoHostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAdministrarCostoHostingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdministrarCostoHostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
