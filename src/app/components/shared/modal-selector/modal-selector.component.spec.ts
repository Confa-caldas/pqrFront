import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectorComponent } from './modal-selector.component';

describe('ModalSelectorComponent', () => {
  let component: ModalSelectorComponent;
  let fixture: ComponentFixture<ModalSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
