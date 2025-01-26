import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es301Component } from './es301.component';

describe('Es301Component', () => {
  let component: Es301Component;
  let fixture: ComponentFixture<Es301Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es301Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es301Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
