import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantTypeComponent } from './applicant-type.component';

describe('ApplicantTypeComponent', () => {
  let component: ApplicantTypeComponent;
  let fixture: ComponentFixture<ApplicantTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicantTypeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicantTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
