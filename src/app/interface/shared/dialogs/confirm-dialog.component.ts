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
    @Inject(MAT_DIALOG_DATA) public data: any, private _reservationService: ReservationService, public snackBar: MatSnackBar) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this._reservationService.deleteReservation(this.data.id).subscribe(result => console.log(result));
    this.dialogRef.close();
    this.openRemoveSnackBar();
  }
  
  openRemoveSnackBar() {
    this.snackBar.openFromComponent(RemoveSnack, {
      duration: 1000,
    });
  }
}