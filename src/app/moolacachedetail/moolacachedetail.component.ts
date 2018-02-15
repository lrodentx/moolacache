import { MoolaService } from './../moola-list/moola.service';
import { Observable } from 'rxjs/Observable';
import { BarnService } from './../barn/barn.service';
import { Subscription } from 'rxjs/Subscription';
import { Farm } from './../farm/farm';
import { Component, Input, OnChanges, OnDestroy, DoCheck } from '@angular/core';
import { Barn } from '../barn/barn';
import { Moola } from '../moola/moola';
import { MoolaDetail } from '../moola-detail/moola-detail';

import * as _ from 'lodash';

@Component({
  selector: 'app-moolacachedetail',
  templateUrl: './moolacachedetail.component.html',
  styleUrls: ['./moolacachedetail.component.scss']
})
export class MoolacachedetailComponent implements OnChanges, OnDestroy {
  private barnSubscription: Subscription;
  private moolaSubscription: Subscription;

  @Input('farm')
  public farm: Farm;
  public moolaByBarn = [ {} ];
  public barns$: Observable<Barn>;
  public moola$: Observable<Moola>;
  public view: any[] = [700, 400];
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };

  constructor(private barnService: BarnService, private moolaService: MoolaService) { }

  ngOnChanges() {
    const barnkeys: string[] = [];
    const moolaDetails = [];
    this.moolaByBarn = [];

    if (this.barnSubscription && !this.barnSubscription.closed) { this.barnSubscription.unsubscribe(); }
    if (this.moolaSubscription && !this.moolaSubscription.closed) { this.moolaSubscription.unsubscribe(); }

    this.barns$ = this.barnService.barns$.switchMap(barns => barns.filter(barn => barn.farm$key === this.farm.$key));
    this.barnSubscription = this.barns$.subscribe(barn => {
      barnkeys.push(barn.$key);
    });

    this.moola$ = this.moolaService.moola$.switchMap(moolas => moolas
      .filter((moola, idx) => _.includes(barnkeys, moola.moolaDetails[idx].barn$key)));
      this.moolaSubscription = this.moola$.map(moola => {
        const _moolaDetails: MoolaDetail[] = moola.moolaDetails as MoolaDetail[];
        moolaDetails.push.apply(moolaDetails, _moolaDetails);
       }).subscribe(_moolaDetails => {
        this.moolaByBarn = _(moolaDetails)
        .groupBy(x => x.barnName)
        .map((moolaDetail, barnName) => ({
          name: barnName,
          value: _.round(_.sumBy(moolaDetail, 'amount'), 2),
        }))
        .value();
      });

  }

  ngOnDestroy() {
    if (this.barnSubscription) { this.barnSubscription.unsubscribe(); }
    if (this.moolaSubscription) { this.moolaSubscription.unsubscribe(); }
  }

}
