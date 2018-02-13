import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Barn } from './barn';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BarnService } from './barn.service';
import { FarmService } from '../farm/farm.service';
import { Farm } from '../farm/farm';
import { MatDialog } from '@angular/material';
import { Entity } from '../shared/entity/entity';

@Component({
  selector: 'app-barn',
  templateUrl: './barn.component.html',
  styleUrls: ['./barn.component.scss']
})
export class BarnComponent extends Entity {
  selectedRow: Number;
  barns$: Observable<Barn[]>;
  farms$: Observable<Farm[]>;
  barn: Barn;
  barnForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected dialog: MatDialog,
    private barnService: BarnService,
    private farmService: FarmService) {
    super(dialog);

    this.barns$ = this.barnService.barns$;
    this.farms$ = this.farmService.farms$;

    this.createForm();
  }

  createForm() {
    this.barnForm = this.fb.group({
      name: ['', [Validators.required]],
      desc: [''],
      allocation: [],
      goal: [],
      farm$key: ['', [Validators.required]]
      });
  }

  getErrorMessage() {
    return this.barnForm.get('name').hasError('required') ? 'You must enter a value' : '';
  }

  selectBarn(selectedRow: Number, selectedBarn: Barn) {
    this.selectedRow = selectedRow;
    this.barn = selectedBarn;
    this.barnForm.reset({
      name: this.barn.name,
      desc: this.barn.desc,
      allocation: this.barn.allocation,
      goal: this.barn.goal,
      farm$key: this.barn.farm$key
    });

  }

  add() {
    this.selectedRow = null;
    this.barn = <Barn>{};
    this.resetBarnForm();
  }

  private resetBarnForm() {
    this.barnForm.reset({
      name: '',
      desc: '',
      allocation: null,
      goal: null,
      farm$: ''
    });
  }

  save() {
    const barn: Barn = this.prepareBarn();

    if (barn.$key) {
      this.barnService.update(barn);
    } else {
      this.barnService.add(barn);
    }
    this.resetBarnForm();
  }

  private prepareBarn() {
    const formModel = this.barnForm.value;
    const barn: Barn = {
      $key: this.barn ? this.barn.$key : undefined,
      name: formModel.name,
      desc: formModel.desc,
      allocation: formModel.allocation,
      goal: formModel.goal,
      farm$key: formModel.farm$key,
      uid: undefined // set in the service
    };
    return barn;
  }

  delete() {
    const barn: Barn = this.prepareBarn();
    this.resetBarnForm();
    this.barnService.delete(barn);
  }

}
