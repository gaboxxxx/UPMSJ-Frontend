import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonanteListaComponent } from './donante-lista.component';

describe('DonanteListaComponent', () => {
  let component: DonanteListaComponent;
  let fixture: ComponentFixture<DonanteListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonanteListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonanteListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
