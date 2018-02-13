import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarnComponent } from './barn.component';

describe('BarnComponent', () => {
  let component: BarnComponent;
  let fixture: ComponentFixture<BarnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
