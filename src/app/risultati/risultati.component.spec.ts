import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisultatiComponent } from './risultati.component';

describe('RisultatiComponent', () => {
  let component: RisultatiComponent;
  let fixture: ComponentFixture<RisultatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RisultatiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RisultatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
