import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es405Component } from './es405.component';

describe('Es405Component', () => {
  let component: Es405Component;
  let fixture: ComponentFixture<Es405Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es405Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Es405Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
