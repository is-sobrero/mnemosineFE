import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserManagerComponent } from './admin-user-manager.component';

describe('AdminUserManagerComponent', () => {
  let component: AdminUserManagerComponent;
  let fixture: ComponentFixture<AdminUserManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUserManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
