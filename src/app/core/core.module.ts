import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LuxonModule } from 'luxon-angular';

import { NavbarComponent } from './navbar/navbar.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ConfirmComponent } from './common/confirm/confirm.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
    FlexLayoutModule,
    LuxonModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'email',
        component: EmailComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ])

  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
    FlexLayoutModule,
    LuxonModule,
    NavbarComponent,
    EmailComponent,
    SignupComponent,
    SigninComponent
  ],
  declarations: [ NavbarComponent,
    EmailComponent,
    SignupComponent,
    SigninComponent,
    ConfirmComponent
  ],
  entryComponents: [ConfirmComponent],
  providers: [ AuthService, AuthGuard, UserService]
})
export class CoreModule { }
