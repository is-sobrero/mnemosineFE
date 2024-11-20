import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es102Component } from './es102.component';

describe('Es102Component', () => {
  let component: Es102Component;
  let fixture: ComponentFixture<Es102Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es102Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es102Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})