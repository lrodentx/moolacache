import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(public authService: AuthService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'google-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/google-icon.svg'));
   }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }


}
