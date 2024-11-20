import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es204Component } from './es204.component';

describe('Es204Component', () => {
  let component: Es204Component;
  let fixture: ComponentFixture<Es204Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es204Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es204Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
