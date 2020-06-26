import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeHealthComponent } from './employee-health.component';

describe('EmployeeHealthComponent', () => {
  let component: EmployeeHealthComponent;
  let fixture: ComponentFixture<EmployeeHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
