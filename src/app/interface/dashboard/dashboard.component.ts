import { Component, OnChanges, AfterViewInit, Inject } from '@angular/core';
import { Employee } from '../../models/employee';
import { OnInit } from '@angular/core';
import { AfterContentChecked } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { interval } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDialog } from '../shared/dialogs/confirm-dialog.component';
import { ConfirmSnack } from '../shared/snacks/confirm-snack.component';
import { UpdateDialog } from '../shared/dialogs/update-dialog.component';


@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [EmployeeService, AuthService, ReservationService, MatSnackBar]
})
export class DashboardComponent implements OnInit {
  employee: Employee;
  reservations: Reservation[];
  filteredReservations: Reservation[];

  numberOfReservations: number;

  restaurantId: string;
  actualDate: Date;

  isLoading: boolean = true;
  isEmpty: boolean = false;

  _filter: string;
  
  get filter(): string {
    return this._filter;
  }

  set filter(value: string){
    this._filter = value;
    this.filteredReservations = this.filter ? this.PerformFilter(this.filter) : this.reservations;
  }

  PerformFilter(value: string): Reservation[] {
    value = value.toLocaleLowerCase();
    return this.reservations.filter(x => (x.customer.firstName.toLocaleLowerCase() + "" + x.customer.lastName.toLocaleLowerCase()).indexOf(value) !== -1);
  }

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog, private _reservationService: ReservationService, private _employeeService : EmployeeService, private _authService: AuthService, private _router: Router) {
    this.filter = '';
    this.actualDate = new Date();
    this.employee = new Employee(); 
  }

  ngOnInit() {
    this._employeeService.getSingleEmployee(localStorage.getItem("login"))
      .subscribe(x => {
                      this.employee = x;
                      this.restaurantId = this.employee.restaurant.id;
                      console.log(this.restaurantId);
                      this.updateReservations();
      });
  }

  updateReservations() {
    this.isEmpty = false;
    this._reservationService.getAllUnconfirmedReservationsForSpecificRestaurant(this.restaurantId)
      .subscribe(reservations => {
        this.reservations = reservations;

        if(this.filter == "") {
          this.filteredReservations = this.reservations;
        }

        if(this.filteredReservations.length == 0) {
          this.isEmpty = true;
        }
        else {
          this.isEmpty = false;
        }

        /*var numOfReservationsBuffer = this.numberOfReservations
        this.numberOfReservations = reservations.length;

        if(numOfReservationsBuffer != this.numberOfReservations)
        {
          console.log("NIE ZGADZAJĄ SIĘ");
        }*/
        
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

  onConfirm(reservationId: string) {
    this._reservationService.confirmReservation(reservationId)
      .subscribe();

    if(this.filter != "") {
      for(let reservation of this.filteredReservations) {
        if(reservation.id == reservationId) {
          this.filteredReservations.splice(this.filteredReservations.indexOf(reservation), 1);
        }
      }
    }
    
    //setTimeout(() => {this.openConfirmSnackBar()}, 1050);
    this.openConfirmSnackBar();
    console.log('Reservation with id: ' + reservationId + 'has been confirmed');
  }

  openRemoveDialog(reservationId: string): void {
    let dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
      data: {id: reservationId}
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(this.filter != "") {
        for(let reservation of this.filteredReservations) {
          if(reservation.id == reservationId) {
            this.filteredReservations.splice(this.filteredReservations.indexOf(reservation), 1);
          }
        }
      }
      console.log('Reservation with id: ' + reservationId + 'has been deleted');
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

  openConfirmSnackBar() {
    this.snackBar.openFromComponent(ConfirmSnack, {
      duration: 1000,
    });
  }
}