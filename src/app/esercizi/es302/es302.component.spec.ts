import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es302Component } from './es302.component';

describe('Es302Component', () => {
  let component: Es302Component;
  let fixture: ComponentFixture<Es302Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es302Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Es302Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
