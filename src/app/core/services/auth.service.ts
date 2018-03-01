import { User } from './user';
import { UserService } from './user.service';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BootController } from '../common/boot/boot';

@Injectable()
export class AuthService {
 user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {

    this.afAuth.auth.getRedirectResult().then(credential => {
      if (credential.user) {
        this.updateUser(credential.user);
      }});

    this.user$ = this.afAuth.authState.switchMap(user => {
      return this.userService.get(user);
    });
  }
   private updateUser(credential) {
    const user: User = <User>{};
    user.displayName = credential.displayName ? credential.displayName : credential.email;
    user.email = credential.email;
    user.uid = credential.uid;
    user.photoURL = credential.photoURL ? credential.photoURL : '';

    this.userService.update(user);
  }

  signupWithEmail(email, password): Observable<any> {
    return Observable.fromPromise( this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        this.updateUser(credential);
        this.goHome();
      }));
  }

  goHome() {
    this.router.navigate(['/']);
  }

  signIn() {
    const returnURL = this.route.snapshot.queryParamMap.get('returnURL') || '/' ;
    localStorage.setItem('returnURL', returnURL);
    this.router.navigate(['/signin']);
  }

  signInWithEmail(email, password): Observable<any> {
    return Observable.fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((credential) => {
        this.updateUser(credential);
        this.goHome();
      }));
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithRedirect(provider);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      // Triggers the reboot in main.ts
      this.ngZone.runOutsideAngular(() => BootController.getbootControl().restart());
      this.goHome();
    });
  }

  isUserSignedIn() {
    let userLoggedIn = false;
    if (this.afAuth.auth.currentUser) {
      userLoggedIn = true;
    }
    return userLoggedIn;
  }

  getUserId() {
    let userId: string;
    const user = this.afAuth.auth.currentUser;
    if (user) {
      userId = user.uid;
    }
    return userId;
  }

}
