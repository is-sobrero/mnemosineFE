import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es304Component } from './es304.component';

describe('Es304Component', () => {
  let component: Es304Component;
  let fixture: ComponentFixture<Es304Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es304Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es304Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
