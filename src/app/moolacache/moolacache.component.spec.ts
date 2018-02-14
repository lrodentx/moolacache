import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoolaCacheComponent } from './moolacache.component';

describe('MoolacacheComponent', () => {
  let component: MoolaCacheComponent;
  let fixture: ComponentFixture<MoolaCacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoolaCacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoolaCacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
