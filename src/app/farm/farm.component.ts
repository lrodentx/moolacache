import { Component, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FarmService } from './farm.service';
import { Farm } from './farm';
import { Observable } from 'rxjs/Observable';
import { Entity } from '../shared/entity/entity';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent extends Entity {
  selectedRow: Number;
  farms$: Observable<Farm[]>;
  farm: Farm;
  farmForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected dialog: MatDialog,
    private farmService: FarmService) {

    super(dialog);
    this.farms$ = this.farmService.farms$;
    this.createForm();
  }

  createForm() {
    this.farmForm = this.fb.group({
      name: ['', [Validators.required]],
      desc: ['']
      });
  }

  getErrorMessage() {
    return this.farmForm.get('name').hasError('required') ? 'You must enter a value' : '';
  }

  selectFarm(selectedRow: Number, selectedFarm: Farm) {
    this.selectedRow = selectedRow;

    this.farm = selectedFarm;
    this.farmForm.reset({
      name: this.farm.name,
      desc: this.farm.desc
    });

  }

  add() {
    this.selectedRow = null;
    this.farm = <Farm>{};
    this.resetFarmForm();
  }

  private resetFarmForm() {
    this.farmForm.reset({
      name: '',
      desc: ''
    });
  }

  save() {
    const farm: Farm = this.prepareFarm();

    if (farm.$key) {
      this.farmService.update(farm);
    } else {
      this.farmService.add(farm);
    }
    this.resetFarmForm();
  }

  private prepareFarm() {
    const formModel = this.farmForm.value;
    const farm: Farm = {
      $key: this.farm ? this.farm.$key : undefined,
      name: formModel.name,
      desc: formModel.desc,
      uid: undefined // set in the service
    };
    return farm;
  }

  delete() {
    const farm: Farm = this.prepareFarm();

    this.farmService.delete(farm);
    this.resetFarmForm();
  }
}
