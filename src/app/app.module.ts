import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/services/auth-guard.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FarmComponent } from './farm/farm.component';
import { FarmService} from './farm/farm.service';
import { BarnService} from './barn/barn.service';
import { MoolaService } from './moola-list/moola-list.service';
import { AllocationLRM } from './shared/services/allocation/allocation-lrm';
import { AllocationServiceFactory } from './shared/services/allocation/allocation.factory';
import { BarnComponent } from './barn/barn.component';
import { MoolaComponent } from './moola/moola.component';
import { MoolaDetailComponent } from './moola-detail/moola-detail.component';
import { MoolaListComponent } from './moola-list/moola-list.component';
import { MoolaCacheComponent } from './moolacache/moolacache.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FarmComponent,
    BarnComponent,
    MoolaComponent,
    MoolaDetailComponent,
    MoolaListComponent,
    MoolaCacheComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    RouterModule.forChild([
      {
        path: 'farm',
        component: FarmComponent, canActivate: [ AuthGuard ]
      },
      {
        path: 'barn',
        component: BarnComponent, canActivate: [ AuthGuard ]
      },
      {
        path: 'moola',
        component: MoolaComponent, canActivate: [ AuthGuard ]
      },
      {
        path: 'moolacache',
        component: MoolaCacheComponent, canActivate: [ AuthGuard ]
      },
      {
        path: '**',
        component: HomeComponent
      }
    ])
  ],
  providers: [ FarmService, BarnService, MoolaService,
    { provide: AllocationLRM, useFactory: () => new AllocationLRM(0, []) },
    { provide: AllocationServiceFactory, useClass: AllocationServiceFactory, deps: [ AllocationLRM ] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
