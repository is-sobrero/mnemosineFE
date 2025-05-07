import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es306Component } from './es306.component';

describe('Es306Component', () => {
  let component: Es306Component;
  let fixture: ComponentFixture<Es306Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es306Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es306Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
