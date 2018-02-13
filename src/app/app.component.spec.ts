import { User } from './core/services/user';
import { AuthService } from './core/services/auth.service';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { MockUser } from './test/core/services/MockUser';
import { UserService } from './core/services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  template: ''
})
class MockHomeComponent { }

@NgModule({
  declarations: [MockHomeComponent],
  exports:      [MockHomeComponent]
})
class MockModule { }
class MockAuthService {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MockModule,
        RouterTestingModule.withRoutes([{
          path: '',
          component: MockHomeComponent
        }])
      ],
      providers: [{provide: AuthService, useValue: MockAuthService}]
    }).compileComponents();
  }));
  xit('should create the app', async(() => {
    // spy = spyOn(authService, 'ngOnInit').and.stub;
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  xit(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
