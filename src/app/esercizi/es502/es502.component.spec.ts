import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es502Component } from './es502.component';

describe('Es502Component', () => {
  let component: Es502Component;
  let fixture: ComponentFixture<Es502Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es502Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es502Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
