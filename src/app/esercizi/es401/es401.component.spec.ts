import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es401Component } from './es401.component';

describe('Es401Component', () => {
  let component: Es401Component;
  let fixture: ComponentFixture<Es401Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es401Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Es401Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
