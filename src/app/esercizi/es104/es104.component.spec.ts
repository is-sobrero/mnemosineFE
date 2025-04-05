import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Es104Component } from './es104.component';

describe('Es104Component', () => {
  let component: Es104Component;
  let fixture: ComponentFixture<Es104Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es104Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Es104Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
