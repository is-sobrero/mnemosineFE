import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es403Component } from './es403.component';

describe('Es403Component', () => {
  let component: Es403Component;
  let fixture: ComponentFixture<Es403Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es403Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
