import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es509Component } from './es509.component';

describe('Es509Component', () => {
  let component: Es509Component;
  let fixture: ComponentFixture<Es509Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es509Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es509Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
