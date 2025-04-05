import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es208Component } from './es208.component';

describe('Es208Component', () => {
  let component: Es208Component;
  let fixture: ComponentFixture<Es208Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es208Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es208Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
