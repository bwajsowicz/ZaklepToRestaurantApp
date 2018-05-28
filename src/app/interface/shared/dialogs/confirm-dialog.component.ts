import { Component } from "@angular/core";
import { ReservationService } from "../../../services/reservation.service";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';;
import { Inject } from "@angular/core";
import { RemoveSnack } from "../snacks/remove-snack.component";

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html',
  providers: [ReservationService]
})
export class ConfirmDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { } 

    onNoClick() {
      this.dialogRef.close();
    }
}