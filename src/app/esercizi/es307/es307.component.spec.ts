import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es307Component } from './es307.component';

describe('Es307Component', () => {
  let component: Es307Component;
  let fixture: ComponentFixture<Es307Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es307Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es307Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
