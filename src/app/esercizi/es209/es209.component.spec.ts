import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es209Component } from './es209.component';

describe('Es209Component', () => {
  let component: Es209Component;
  let fixture: ComponentFixture<Es209Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es209Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es209Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
