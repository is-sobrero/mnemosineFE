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
import { Es305Component } from './es305.component';

describe('Es305Component', () => {
  let component: Es305Component;
  let fixture: ComponentFixture<Es305Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Es305Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Es305Component);
>>>>>>>> b8aacf3 (ES305 FIXATO):src/app/esercizi/es305/es305.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
