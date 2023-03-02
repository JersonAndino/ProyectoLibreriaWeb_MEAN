import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLibroComponent } from './detalle-libro.component';

describe('DetalleLibroComponent', () => {
  let component: DetalleLibroComponent;
  let fixture: ComponentFixture<DetalleLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleLibroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
