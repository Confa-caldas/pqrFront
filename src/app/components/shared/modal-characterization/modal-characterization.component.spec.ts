import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCharacterizationComponent } from './modal-characterization.component';

describe('ModalCharacterizationComponent', () => {
  let component: ModalCharacterizationComponent;
  let fixture: ComponentFixture<ModalCharacterizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCharacterizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCharacterizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
