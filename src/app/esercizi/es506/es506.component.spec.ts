import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es506Component } from './es506.component';

describe('Es506Component', () => {
  let component: Es506Component;
  let fixture: ComponentFixture<Es506Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es506Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es506Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
