import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Farm } from '../farm/farm';
import { FarmService } from '../farm/farm.service';

@Component({
  selector: 'app-moola',
  templateUrl: './moola.component.html',
  styleUrls: ['./moola.component.scss']
})
export class MoolaComponent {
  public farms$: Observable<Farm[]>;
  public moolaForm: FormGroup;

  constructor(private fb: FormBuilder,
    private farmService: FarmService) {

    this.farms$ = this.farmService.farms$;
    this.createForm();
   }

   createForm() {
    this.moolaForm = this.fb.group({
      farm: ['', [Validators.required]],
      amountToAllocate: ['', [Validators.required]]
    });
  }

  getErrorMessage() {
    return this.moolaForm.get('amountToAllocate').hasError('required') ? 'You must enter an amount greater than zero' : '';
  }

}
