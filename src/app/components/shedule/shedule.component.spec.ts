import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheduleComponent } from './shedule.component';

describe('SheduleComponent', () => {
  let component: SheduleComponent;
  let fixture: ComponentFixture<SheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
