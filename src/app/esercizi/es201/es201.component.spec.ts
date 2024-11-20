import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es201Component } from './es201.component';

describe('Es201Component', () => {
  let component: Es201Component;
  let fixture: ComponentFixture<Es201Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es201Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es201Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
