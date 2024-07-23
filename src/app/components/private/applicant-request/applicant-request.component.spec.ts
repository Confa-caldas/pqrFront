import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantRequestComponent } from './applicant-request.component';

describe('ApplicantRequestComponent', () => {
  let component: ApplicantRequestComponent;
  let fixture: ComponentFixture<ApplicantRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicantRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
