import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private userSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.userSubscription = authService.user$.subscribe(user => {
      if (user) {
        const returnURL = localStorage.getItem('returnURL');
        router.navigateByUrl(returnURL);
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
