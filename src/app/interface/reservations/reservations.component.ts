import { Component } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDialog } from '../shared/dialogs/confirm-dialog.component';
import { UpdateDialog } from '../shared/dialogs/update-dialog.component';
import { RemoveSnack } from '../shared/snacks/remove-snack.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  providers: [ EmployeeService, ReservationService, AuthService ]
})

export class ReservationsComponent {
  employee: Employee;
  reservations: Reservation[];
  restaurantId: string;
  actualDate: Date;

  isLoading: boolean = true;
  isEmpty: boolean = false;

  constructor(private _reservationService: ReservationService, private _employeeService : EmployeeService, private _authService: AuthService, private _router: Router,  public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.actualDate = new Date();
    this.employee = new Employee();
    _employeeService.getSingleEmployee(localStorage.getItem("login"))
      .subscribe(x => {
                      this.employee = x;
                      this.restaurantId = this.employee.restaurant.id;
                      console.log(this.restaurantId);
                      this.updateReservations();
      }); 
  }

  updateReservations() {
    this.isEmpty = false;

    this._reservationService.getAllReservationsForSpecificRestaurantAndDate(this.restaurantId, this.actualDate.toJSON())
      .subscribe(reservations => {
        console.log(this.actualDate);
        this.reservations = reservations;
        
        for(let reservation of reservations) 
        {
          let dateString = reservation.dateStart.toString();
          reservation.dateStart = new Date(dateString);
        }

        if(this.reservations.length == 0)
          this.isEmpty = true;

        this.isLoading = false;
      });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.reservations = null;
    this.isLoading = true;
    this.actualDate = event.value;

    if(this.actualDate != null) {
      this.actualDate.setHours(10);
      this.updateReservations();
    }
    else {
      this.isEmpty = true;
      this.isLoading = false;
    }
  }

  openRemoveDialog(reservationId: string): void {
    let dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
      data: {id: reservationId}
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        for(let reservation of this.reservations) {
          if(reservation.id == reservationId) 
          {
            this.reservations.splice(this.reservations.indexOf(reservation), 1);
          }
        }
        this.openRemoveSnackBar();
        this._reservationService.deleteReservation(reservationId).subscribe();
      }
    });
  }

  openUpdateDialog(reservation: Reservation): void {
    let dialogRef = this.dialog.open(UpdateDialog, {
      width: '250px',
      data: {
        customer: reservation.customer.firstName + " " + reservation.customer.lastName,
        date: reservation.dateStart,
        numberOfSeats: 1
      }
    });
 
    dialogRef.afterClosed().subscribe(result => {
      console.log('Reservation with id: ' + reservation.id + 'has been updated');
    });
  }

  openRemoveSnackBar() {
    this.snackBar.openFromComponent(RemoveSnack, {
      duration: 1000,
    });
  }
}
