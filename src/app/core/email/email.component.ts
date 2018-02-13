import { Observable } from 'rxjs/Observable';
import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { empty } from 'rxjs/Observer';
import { ViewChild } from '@angular/core';
import { MatInput } from '@angular/material';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnDestroy, AfterViewInit {
  @ViewChild(MatInput)
  input;
  error: String;
  emailForm: FormGroup;
  private subscription: Subscription;
  constructor(private authService: AuthService, private fb: FormBuilder) {
      if (this.authService.isUserSignedIn()) {
        this.authService.goHome();
      } else {
        this.createForm();
      }
    }

    createForm() {
      this.emailForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25)]]
        });
    }

    getErrorMessage(field: String) {
      let errorMsg: String;
      errorMsg = this.emailForm.get('' + field + '').hasError('required') ? 'You must enter a value' : null;
      if (!errorMsg) {
        errorMsg = this.emailForm.get('' + field + '').hasError('email') ? 'You must enter a valid email address' : null;
      } else if (!errorMsg) {
        errorMsg = this.emailForm.get('' + field + '').hasError('minlength') ? 'You must enter at least 6 characters' : null;
      } else if (!errorMsg) {
        errorMsg = this.emailForm.get('' + field + '').hasError('maxlength') ? 'You cannot enter over 25 characters' : null;
      }
      return errorMsg ? errorMsg : '';
    }

    private get email() { return this.emailForm.get('email'); }
    private get password() { return this.emailForm.get('password'); }

    signInWithEmail() {
      this.subscription = this.authService.signInWithEmail(this.email.value, this.password.value)
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
