import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Es308Component } from './es308.component';

describe('Es308Component', () => {
  let component: Es308Component;
  let fixture: ComponentFixture<Es308Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es308Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es308Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
