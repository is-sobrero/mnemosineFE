import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/esercizi/es509/es509.component.spec.ts
import { Es509Component } from './es509.component';

describe('Es509Component', () => {
  let component: Es509Component;
  let fixture: ComponentFixture<Es509Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es509Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es509Component);
========
import { Es309Component } from './es309.component';

describe('Es309Component', () => {
  let component: Es309Component;
  let fixture: ComponentFixture<Es309Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es309Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Es309Component);
>>>>>>>> 424ddab (ES309 FIXATO):src/app/esercizi/es309/es309.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
