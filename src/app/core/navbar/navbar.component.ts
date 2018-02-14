import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  location = '' ;

  constructor(public authService: AuthService, private router: Router) {
    this.location = router.url;
  }

  signIn() {
    this.authService.signIn();
  }

  signOut() {
    this.authService.signOut();
  }

  isShowMenu() {
    let showMenu = false;
    if (this.authService.isUserSignedIn() && this.location === '/') {
      showMenu = true;
    }
    return showMenu;
  }

  isShowHome() {
    let showHomeButton = false;
    const isUserSignedIn = this.authService.isUserSignedIn();
    if (isUserSignedIn && this.location !== '/' ||
        !isUserSignedIn && (this.isSignInLocation())) {
      showHomeButton = true;
    }
    return showHomeButton;
  }

  private isSignInLocation() {
    return this.location === '/signin' || this.location === '/email' || this.location === '/signup';
  }

  isShowSignIn() {
    let showSignInButton = true;
    if (this.isSignInLocation()) {
          showSignInButton = false;
    }
    return showSignInButton;
  }

  goHome() {
    this.router.navigate(['/']);
  }

  addFarms() {
    this.router.navigate(['farm']);
  }

  addBarns() {
    this.router.navigate(['barn']);
  }

  addMoola() {
    this.router.navigate(['moola']);
  }

  showMoolaCache() {
    this.router.navigate(['moolacache']);
  }

}
