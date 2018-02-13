import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoolaDetailComponent } from './moola-detail.component';

describe('MoolaDetailComponent', () => {
  let component: MoolaDetailComponent;
  let fixture: ComponentFixture<MoolaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoolaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoolaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
