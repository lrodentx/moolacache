import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { Farm } from './../farm/farm';
import { Moola } from '../moola/moola';
import { MoolaService } from './../moola-list/moola.service';
import { MoolaDetail } from '../moola-detail/moola-detail';

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
  public moola$: Observable<Moola>;
  view: any[] = [];
  public scheme = 'nightLights';

  constructor(private moolaService: MoolaService,
    private media: ObservableMedia) { }

  ngOnChanges() {
    const moolaDetails = [];
    this.moolaByBarn = [];

    if (this.moolaSubscription && !this.moolaSubscription.closed) { this.moolaSubscription.unsubscribe(); }

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
    if (this.moolaSubscription) { this.moolaSubscription.unsubscribe(); }
    if (this.mediaSubscription) { this.mediaSubscription.unsubscribe(); }
  }

}
