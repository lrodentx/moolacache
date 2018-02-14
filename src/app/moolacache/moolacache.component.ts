import { FormBuilder, FormGroup } from '@angular/forms';
import { FarmService } from './../farm/farm.service';
import { Farm } from './../farm/farm';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

@Component({
  selector: 'app-moolacache',
  templateUrl: './moolacache.component.html',
  styleUrls: ['./moolacache.component.scss']
})
export class MoolaCacheComponent {
  public farms$: Observable<Farm[]>;
  public moolaCacheForm: FormGroup;

  constructor(private fb: FormBuilder,
    private farmService: FarmService) {
      this.farms$ = this.farmService.farms$;
      this.createForm();
  }

  createForm() {
    this.moolaCacheForm = this.fb.group({
      farm: ['']
    });
  }

}
