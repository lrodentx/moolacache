import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoolaComponent } from './moola.component';

describe('MoolaComponent', () => {
  let component: MoolaComponent;
  let fixture: ComponentFixture<MoolaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoolaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
