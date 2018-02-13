import { Component, OnInit, Input, OnChanges, OnDestroy, isDevMode } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Farm } from '../farm/farm';
import { BarnService } from '../barn/barn.service';
import { Barn } from '../barn/barn';
import { Moola } from '../moola/moola';
import { MoolaDetail } from '../moola-detail/moola-detail';
import { Subscription } from 'rxjs/Subscription';
import { Allocation } from '../shared/services/allocation/allocation';
import { AllocationConfig } from '../shared/services/allocation/allocation.config';
import { AllocationHAM } from './../shared/services/allocation/allocation-ham';
import { AllocationServiceFactory } from './../shared/services/allocation/allocation.factory';
import { AllocationService } from '../shared/services/allocation/allocation.service';
import { MoolaService } from './moola-list.service';

import * as _ from 'lodash';


@Component({
  selector: 'app-moola-list',
  templateUrl: './moola-list.component.html',
  styleUrls: ['./moola-list.component.scss']
})
export class MoolaListComponent implements OnInit, OnChanges, OnDestroy {
  private barnSubscription: Subscription;

  @Input('farm')
  public farm: Farm;

  @Input('moolaForm')
  public moolaForm: FormGroup;

  public barns$: Observable<Barn[]>;
  public moolaDetails: MoolaDetail[] = [];
  public logJSON = false;
  public totalAllocations = 0;

  constructor(private barnService: BarnService,
    private allocationServiceFactory: AllocationServiceFactory,
    private moolaService: MoolaService) { }

  ngOnInit() {
    this.moolaForm.addControl('moolaDetails', new FormArray([]));
    if (isDevMode()) {
      this.logJSON = true;
    }
  }

  ngOnChanges() {
    this.moolaForm.setControl('moolaDetails', new FormArray([]));
    if (this.barnSubscription && !this.barnSubscription.closed) { this.barnSubscription.unsubscribe(); }
    this.moolaDetails = [];
    this.barns$ = this.barnService.barns$.map(barns => barns.filter(barn => barn.farm$key === this.farm.$key));
    this.barnSubscription = this.barns$.subscribe( barns => {
      barns.map(barn => {
        const moolaDetail: MoolaDetail = <MoolaDetail>{};
        moolaDetail.barn$key = barn.$key;
        moolaDetail.barnName =  barn.name;
        moolaDetail.allocation = barn.allocation;
        this.moolaDetails.push(moolaDetail);
      });
      this.moolaDetails = _.sortBy(this.moolaDetails, 'barnName');
    });
  }

  ngOnDestroy() {
    this.barnSubscription.unsubscribe();
  }

  sumAllocations() {
    this.totalAllocations = this.moolaDetails.reduce((sum, val) => sum + val.allocation, 0);
    return this.totalAllocations;
  }

  allocate() {
    const formModel = this.moolaForm.value;
    const config: AllocationConfig = new AllocationHAM(formModel.amountToAllocate, this.transformToAllocations(formModel.moolaDetails));
    const service: AllocationService = this.allocationServiceFactory.createServiceWithConfig(config);
    const allocations: Allocation[] = service.allocate();
    this.moolaForm.setControl('moolaDetails', new FormArray([]));
    this.moolaDetails = this.updateMoolaDetails(formModel.moolaDetails, this.transformToMoolaDetail(allocations));
  }

  private transformToAllocations(moolaDetails: MoolaDetail[]): Allocation[] {
    return _.map(moolaDetails, function (moolaDetail) {
      return new Allocation(moolaDetail.barnName, moolaDetail.allocation);
    });
  }

  private updateMoolaDetails(moolaDetails: MoolaDetail[], allocatedMoolaDetail: MoolaDetail[]) {
    return _.merge(_.sortBy(moolaDetails, 'barnName'),
      _.sortBy(allocatedMoolaDetail, 'barnName'));
  }

  private transformToMoolaDetail(allocations: Allocation[]): MoolaDetail[] {
    return _.map(allocations, function(allocation) {
      const moolaDetail: MoolaDetail = <MoolaDetail>{};
      moolaDetail.barnName = allocation.id;
      moolaDetail.amount = allocation.amount;
      return moolaDetail;
    });
  }

  save() {
    const moola: Moola = this.prepareMoola();
    // this.moolaService.add(moola);
    console.log(this.prepareMoola());
  }

  private prepareMoola() {
    const formModel = this.moolaForm.value;
    const moola: Moola = {
      $key: undefined,
      date: new Date(),
      farm$key: formModel.farm.$key,
      farmName: formModel.farm.name,
      amountToAllocate: formModel.amountToAllocate,
      moolaDetails: formModel.moolaDetails,
      uid: undefined
    };
    return moola;
  }

}
