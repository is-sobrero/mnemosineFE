import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es101Component } from './es101.component';

describe('Es101Component', () => {
  let component: Es101Component;
  let fixture: ComponentFixture<Es101Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es101Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es101Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
