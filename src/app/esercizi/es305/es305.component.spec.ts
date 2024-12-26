import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es305Component } from './es305.component';

describe('Es305Component', () => {
  let component: Es305Component;
  let fixture: ComponentFixture<Es305Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es305Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es305Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
