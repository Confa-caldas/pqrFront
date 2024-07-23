import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDataTreatmentComponent } from './modal-data-treatment.component';

describe('ModalDataTreatmentComponent', () => {
  let component: ModalDataTreatmentComponent;
  let fixture: ComponentFixture<ModalDataTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDataTreatmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDataTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
