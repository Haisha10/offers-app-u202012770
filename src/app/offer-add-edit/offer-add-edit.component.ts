import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from '../services/snack-bar.service';
import { OfferService } from '../services/offer.service';


@Component({
  selector: 'app-offer-add-edit',
  templateUrl: './offer-add-edit.component.html',
  styleUrls: ['./offer-add-edit.component.css']
})
export class OfferAddEditComponent implements OnInit {
  offerForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _offerService: OfferService,
    private _dialogRef: MatDialogRef<OfferAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: SnackBarService
  ) {
    this.offerForm = this._fb.group({
      title: '',
      description: '',
      points: '',
      businessId: ''
    });
  }
  ngOnInit(): void {
    this.offerForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.offerForm.valid) {
      if (this.data) {
        this._offerService
          .updateOffer(this.data.id, this.offerForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Offer actualizado con éxito');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._offerService.addOffer(this.offerForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Offer añadido con éxito');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
