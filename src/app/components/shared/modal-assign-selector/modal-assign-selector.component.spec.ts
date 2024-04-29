import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssignSelectorComponent } from './modal-assign-selector.component';

describe('ModalAssignSelectorComponent', () => {
  let component: ModalAssignSelectorComponent;
  let fixture: ComponentFixture<ModalAssignSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAssignSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAssignSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
