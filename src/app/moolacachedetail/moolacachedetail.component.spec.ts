import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoolacachedetailComponent } from './moolacachedetail.component';

describe('MoolacachedetailComponent', () => {
  let component: MoolacachedetailComponent;
  let fixture: ComponentFixture<MoolacachedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoolacachedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoolacachedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
