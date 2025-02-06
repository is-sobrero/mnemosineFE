import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es505Component } from './es505.component';

describe('Es505Component', () => {
  let component: Es505Component;
  let fixture: ComponentFixture<Es505Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es505Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Es505Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
