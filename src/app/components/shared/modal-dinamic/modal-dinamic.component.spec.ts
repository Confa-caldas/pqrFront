import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDinamicComponent } from './modal-dinamic.component';

describe('ModalDinamicComponent', () => {
  let component: ModalDinamicComponent;
  let fixture: ComponentFixture<ModalDinamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDinamicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDinamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
