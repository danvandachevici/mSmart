import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineStatusCircleComponent } from './machine-status-circle.component';

describe('MachineStatusCircleComponent', () => {
  let component: MachineStatusCircleComponent;
  let fixture: ComponentFixture<MachineStatusCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineStatusCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineStatusCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
