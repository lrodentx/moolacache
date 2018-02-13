import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Moola } from '../moola/moola';
import { MoolaDetail } from './moola-detail';
import { Barn } from '../barn/barn';

@Component({
  selector: 'app-moola-detail',
  templateUrl: './moola-detail.component.html',
  styleUrls: ['./moola-detail.component.scss']
})
export class MoolaDetailComponent implements OnInit {
  @Input('moolaDetails')
  public moolaDetails: FormArray;

  @Input('moolaDetail')
  public moolaDetail: MoolaDetail;

  public moolaDetailForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.moolaDetailForm = this.createMoolaDetail(this.moolaDetail);
    this.moolaDetails.push(this.moolaDetailForm);
  }

  private createMoolaDetail(moolaDetail: MoolaDetail): FormGroup {
    return this.fb.group({
      barn$key: moolaDetail.barn$key,
      barnName: moolaDetail.barnName,
      allocation: [ moolaDetail.allocation || undefined, Validators.required ],
      amount: moolaDetail.amount
    });
  }

}
