import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNotificationComponent } from './modal-notification.component';

describe('ModalNotificationComponent', () => {
  let component: ModalNotificationComponent;
  let fixture: ComponentFixture<ModalNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
