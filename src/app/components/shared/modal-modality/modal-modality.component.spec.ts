import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModalityComponent } from './modal-modality.component';

describe('ModalModalityComponent', () => {
  let component: ModalModalityComponent;
  let fixture: ComponentFixture<ModalModalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalModalityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalModalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
