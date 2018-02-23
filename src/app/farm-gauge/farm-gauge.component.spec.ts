import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmGaugeComponent } from './farm-gauge.component';

describe('FarmGaugeComponent', () => {
  let component: FarmGaugeComponent;
  let fixture: ComponentFixture<FarmGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
