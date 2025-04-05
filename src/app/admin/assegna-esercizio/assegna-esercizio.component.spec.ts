import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssegnaEsercizioComponent } from './assegna-esercizio.component';

describe('AssegnaEsercizioComponent', () => {
  let component: AssegnaEsercizioComponent;
  let fixture: ComponentFixture<AssegnaEsercizioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssegnaEsercizioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssegnaEsercizioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
