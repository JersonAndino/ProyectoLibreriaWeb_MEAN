import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionComponent } from './transaccion.component';

describe('TransaccionComponent', () => {
  let component: TransaccionComponent;
  let fixture: ComponentFixture<TransaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransaccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
