import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es106Component } from './es106.component';

describe('Es106Component', () => {
  let component: Es106Component;
  let fixture: ComponentFixture<Es106Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es106Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Es106Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
