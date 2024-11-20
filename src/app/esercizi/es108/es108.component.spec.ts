import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es108Component } from './es108.component';

describe('Es108Component', () => {
  let component: Es108Component;
  let fixture: ComponentFixture<Es108Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es108Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es108Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
