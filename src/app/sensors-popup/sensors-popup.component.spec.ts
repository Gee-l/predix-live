import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsPopupComponent } from './sensors-popup.component';

describe('SensorsPopupComponent', () => {
  let component: SensorsPopupComponent;
  let fixture: ComponentFixture<SensorsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
