import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es501Component } from './es501.component';

describe('Es501Component', () => {
  let component: Es501Component;
  let fixture: ComponentFixture<Es501Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es501Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es501Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
