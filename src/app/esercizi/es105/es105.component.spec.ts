import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Es105Component } from './es105.component';

describe('Es104Component', () => {
    let component: Es105Component;
    let fixture: ComponentFixture<Es105Component>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Es105Component]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Es105Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
