import { Component } from "@angular/core";
import { ReservationService } from "../../../services/reservation.service";
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from "@angular/material";
import { Inject } from "@angular/core";

@Component({
  selector: 'update-dialog',
  templateUrl: 'update-dialog.html',
  providers: [ReservationService]
})
export class UpdateDialog {
  customer: string;
  date: Date;
  numberOfSeats: number;

  constructor(
    public dialogRef: MatDialogRef<UpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _reservationService: ReservationService) {
      this.customer = data.customer;
      this.date = data.date;
      this.numberOfSeats = data.numberOfSeats;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  }
}
