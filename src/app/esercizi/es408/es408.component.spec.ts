import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es408Component } from './es408.component';

describe('Es408Component', () => {
  let component: Es408Component;
  let fixture: ComponentFixture<Es408Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es408Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Es408Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
