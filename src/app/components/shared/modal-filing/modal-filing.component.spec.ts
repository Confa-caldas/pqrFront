import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFilingComponent } from './modal-filing.component';

describe('ModalFilingComponent', () => {
  let component: ModalFilingComponent;
  let fixture: ComponentFixture<ModalFilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFilingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
