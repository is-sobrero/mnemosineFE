import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es202Component } from './es202.component';

describe('Es202Component', () => {
  let component: Es202Component;
  let fixture: ComponentFixture<Es202Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es202Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Es202Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
