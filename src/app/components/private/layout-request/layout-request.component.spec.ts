import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutRequestComponent } from './layout-request.component';

describe('LayoutRequestComponent', () => {
  let component: LayoutRequestComponent;
  let fixture: ComponentFixture<LayoutRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
