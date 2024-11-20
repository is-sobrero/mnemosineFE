import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es303Component } from './es303.component';

describe('Es303Component', () => {
  let component: Es303Component;
  let fixture: ComponentFixture<Es303Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es303Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es303Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
