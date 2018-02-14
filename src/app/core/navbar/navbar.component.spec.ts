import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from './../services/auth.service';
import { MaterialModule } from './../material.module';
import { AppComponent } from './../../app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { User } from '../services/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const subjectMock = new BehaviorSubject(<User>{});
const observableMock$ = subjectMock.asObservable();
const AuthServiceStub = {
  get user$() {
    return observableMock$.map((model: User) => model.displayName);
  },
  getUserId: (userid) => {
    return 'testUser';
  },
  isUserSignedIn: () => {
    return false;
  }
};

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, NavbarComponent ],
      imports: [ MaterialModule, FlexLayoutModule, RouterTestingModule ],
      providers: [
        { provide: AuthService, useValue: AuthServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
