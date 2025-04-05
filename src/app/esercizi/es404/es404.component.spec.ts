import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es404Component } from './es404.component';

describe('Es404Component', () => {
  let component: Es404Component;
  let fixture: ComponentFixture<Es404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es404Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
