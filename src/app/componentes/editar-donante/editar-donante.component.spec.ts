import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDonanteComponent } from './editar-donante.component';

describe('EditarDonanteComponent', () => {
  let component: EditarDonanteComponent;
  let fixture: ComponentFixture<EditarDonanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDonanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarDonanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
