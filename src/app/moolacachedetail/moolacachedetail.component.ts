import { MoolaService } from './../moola-list/moola.service';
import { Observable } from 'rxjs/Observable';
import { BarnService } from './../barn/barn.service';
import { Subscription } from 'rxjs/Subscription';
import { Farm } from './../farm/farm';
import { Component, Input, OnChanges, OnDestroy, DoCheck } from '@angular/core';
import { Barn } from '../barn/barn';
import { Moola } from '../moola/moola';
import { MoolaDetail } from '../moola-detail/moola-detail';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

import * as _ from 'lodash';
import * as numeral from 'numeral';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-moolacachedetail',
  templateUrl: './moolacachedetail.component.html',
  styleUrls: ['./moolacachedetail.component.scss']
})
export class MoolacachedetailComponent implements OnChanges, OnDestroy {
  private barnSubscription: Subscription;
  private moolaSubscription: Subscription;
  private mediaSubscription: Subscription;

  @Input('farm')
  public farm: Farm;
  public moolaByBarn = [ {} ];
  public barns$: Observable<Barn>;
  public moola$: Observable<Moola>;
  view: any[] = [];
  public scheme = 'nightLights';

  constructor(private barnService: BarnService, private moolaService: MoolaService,
    private media: ObservableMedia) { }

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

    this.moola$ = this.moolaService.moola$.switchMap(moolas => moolas.filter((moola) => (moola.farm$key === this.farm.$key)));

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
      this.moolaByBarn = _.map(this.moolaByBarn, (moola) => this.toCurrency(moola));
    });

    this.mediaSubscription = this.media.asObservable().subscribe((change: MediaChange) => {
      this.changeGraphSize();
    });
    this.changeGraphSize();
  }

  private toCurrency(moola) {
    const currency = numeral(moola.value);
    return { name: moola.name, value: currency.format('$0,0.00') };
  }

  private changeGraphSize() {
    let graphSize = 0;
    if (this.media.isActive('xs')) {
      graphSize = 350;
    } else if (this.media.isActive('sm')) {
      graphSize = 400;
    } else if (this.media.isActive('md')) {
      graphSize = 500;
    } else {
      graphSize = 500;
    }
    this.view = [graphSize, graphSize];
  }

  ngOnDestroy() {
    if (this.barnSubscription) { this.barnSubscription.unsubscribe(); }
    if (this.moolaSubscription) { this.moolaSubscription.unsubscribe(); }
    if (this.mediaSubscription) { this.mediaSubscription.unsubscribe(); }
  }

}
