import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es409Component } from './es409.component';

describe('Es409Component', () => {
  let component: Es409Component;
  let fixture: ComponentFixture<Es409Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es409Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es409Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
//NIGGA 