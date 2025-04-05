import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es410Component } from './es410.component';

describe('Es410Component', () => {
  let component: Es410Component;
  let fixture: ComponentFixture<Es410Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es410Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Es410Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
