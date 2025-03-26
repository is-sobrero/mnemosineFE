import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es309Component } from './es309.component';

describe('Es309Component', () => {
  let component: Es309Component;
  let fixture: ComponentFixture<Es309Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es309Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es309Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
