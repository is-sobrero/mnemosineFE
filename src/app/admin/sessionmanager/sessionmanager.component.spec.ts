import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionmanagerComponent } from './sessionmanager.component';

describe('SessionmanagerComponent', () => {
  let component: SessionmanagerComponent;
  let fixture: ComponentFixture<SessionmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionmanagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessionmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
