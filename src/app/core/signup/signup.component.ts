import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MatInput } from '@angular/material';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnDestroy, AfterViewInit {
  @ViewChild(MatInput)
  input;

  error: String;
  signupForm: FormGroup;
  private subscription: Subscription;
  constructor(private authService: AuthService, private fb: FormBuilder) {
      this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)]]
      });
  }

  getErrorMessage(field: String) {
    let errorMsg: String;
    errorMsg = this.signupForm.get('' + field + '').hasError('required') ? 'You must enter a value' : null;
    if (!errorMsg) {
      errorMsg = this.signupForm.get('' + field + '').hasError('email') ? 'You must enter a valid email address' : null;
    } else if (!errorMsg) {
      errorMsg = this.signupForm.get('' + field + '').hasError('minlength') ? 'You must enter at least 6 characters' : null;
    } else if (!errorMsg) {
      errorMsg = this.signupForm.get('' + field + '').hasError('maxlength') ? 'You cannot enter over 25 characters' : null;
    }
    return errorMsg ? errorMsg : '';
  }

  private get email() { return this.signupForm.get('email'); }
  private get password() { return this.signupForm.get('password'); }

  signUpWithEmail() {
    this.subscription = this.authService.signupWithEmail(this.email.value, this.password.value)
    .subscribe(() => {}, error => {
        this.error = error;
      });
  }

  ngAfterViewInit() {
    Promise.resolve(null).then(() => this.input.focus());
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
