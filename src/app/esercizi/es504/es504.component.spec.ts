import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es504Component } from './es504.component';

describe('Es504Component', () => {
  let component: Es504Component;
  let fixture: ComponentFixture<Es504Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es504Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Es504Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
