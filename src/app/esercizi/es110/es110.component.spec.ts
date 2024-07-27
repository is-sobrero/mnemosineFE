import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es110Component } from './es110.component';

describe('Es101Component', () => {
  let component: Es110Component;
  let fixture: ComponentFixture<Es110Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es110Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Es110Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
