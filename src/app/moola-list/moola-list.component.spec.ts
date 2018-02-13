import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoolaListComponent } from './moola-list.component';

describe('MoolaListComponent', () => {
  let component: MoolaListComponent;
  let fixture: ComponentFixture<MoolaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoolaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoolaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
