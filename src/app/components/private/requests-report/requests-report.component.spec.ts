import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsReportComponent } from './requests-report.component';

describe('RequestsReportComponent', () => {
  let component: RequestsReportComponent;
  let fixture: ComponentFixture<RequestsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestsReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
