import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es402Component } from './es402.component';

describe('Es402Component', () => {
  let component: Es402Component;
  let fixture: ComponentFixture<Es402Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es402Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Es402Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
