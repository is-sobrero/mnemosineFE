import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es203Component } from './es203.component';

describe('Es203Component', () => {
  let component: Es203Component;
  let fixture: ComponentFixture<Es203Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es203Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es203Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
