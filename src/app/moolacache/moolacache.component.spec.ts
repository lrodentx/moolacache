import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoolacacheComponent } from './moolacache.component';

describe('MoolacacheComponent', () => {
  let component: MoolacacheComponent;
  let fixture: ComponentFixture<MoolacacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoolacacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoolacacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
