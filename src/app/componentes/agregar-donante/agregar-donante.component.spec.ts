import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDonanteComponent } from './agregar-donante.component';

describe('AgregarDonanteComponent', () => {
  let component: AgregarDonanteComponent;
  let fixture: ComponentFixture<AgregarDonanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarDonanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarDonanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
