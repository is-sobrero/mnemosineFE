import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es407Component } from './es407.component';

describe('Es407Component', () => {
  let component: Es407Component;
  let fixture: ComponentFixture<Es407Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es407Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Es407Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
