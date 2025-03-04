import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es206Component } from './es206.component';

describe('Es206Component', () => {
  let component: Es206Component;
  let fixture: ComponentFixture<Es206Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es206Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es206Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
