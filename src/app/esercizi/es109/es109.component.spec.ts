import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es109Component } from './es109.component';

describe('Es109Component', () => {
  let component: Es109Component;
  let fixture: ComponentFixture<Es109Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es109Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es109Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
