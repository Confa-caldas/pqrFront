import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessRequestComponent } from './process-request.component';

describe('ProcessRequestComponent', () => {
  let component: ProcessRequestComponent;
  let fixture: ComponentFixture<ProcessRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
