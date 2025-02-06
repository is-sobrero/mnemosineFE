import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es103Component } from './es103.component';

describe('Es103Component', () => {
  let component: Es103Component;
  let fixture: ComponentFixture<Es103Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es103Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Es103Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
