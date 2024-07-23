import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRequestComponent } from './search-request.component';

describe('SearchRequestComponent', () => {
  let component: SearchRequestComponent;
  let fixture: ComponentFixture<SearchRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchRequestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
