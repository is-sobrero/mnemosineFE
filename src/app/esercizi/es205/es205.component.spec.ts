import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es205Component } from './es205.component';

describe('Es205Component', () => {
  let component: Es205Component;
  let fixture: ComponentFixture<Es205Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es205Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es205Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
