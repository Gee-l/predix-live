import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorinfoComponent } from './sensorinfo.component';

describe('SensorinfoComponent', () => {
  let component: SensorinfoComponent;
  let fixture: ComponentFixture<SensorinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
