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
import { HostListener } from '@angular/core';
import { trigger } from '@angular/animations';
import { transition } from '@angular/animations';
import { style, query} from '@angular/animations';
import { animate } from '@angular/animations';
import { state } from '@angular/animations';
import { RemoveSnack } from '../shared/snacks/remove-snack.component';


@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [EmployeeService, AuthService, ReservationService, MatSnackBar],
  animations: [
    trigger("fade", [
      state("void", style({ opacity: 0})),
      transition("void => *", [
        animate(500)
      ]),
      transition("* => void", [
        animate(500)
      ]),
    ])
  ]
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

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key == '`') 
      this.updateReservations();
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
    this.isLoading = true;
    this._employeeService.getSingleEmployee(localStorage.getItem("login"))
      .subscribe(x => {
                      this.employee = x;
                      this.restaurantId = this.employee.restaurant.id;
                      this.updateReservations();
      });
  }

  updateReservations() {
    this.isEmpty = false;
    this.isLoading = true;
    this.filteredReservations = [];
    this._reservationService.getAllUnconfirmedReservationsForSpecificRestaurant(this.restaurantId)
      .subscribe(reservations => {
        this.reservations = reservations;
        this.filteredReservations = reservations;

        for(let reservation of reservations) 
        {
          let dateString = reservation.dateStart.toString();
          reservation.dateStart = new Date(dateString);
        }

        if(this.filteredReservations.length == 0) {
          this.isEmpty = true;
        }

        this.isLoading = false;
      });
  }

  onConfirm(reservationId: string) {
    for(let reservation of this.filteredReservations) {
      if(reservation.id == reservationId)
        this.filteredReservations.splice(this.filteredReservations.indexOf(reservation), 1);
    }
    for(let reservation of this.reservations) {
      if(reservation.id == reservationId)
        this.reservations.splice(this.reservations.indexOf(reservation), 1);
    }
    
    this.openConfirmSnackBar();

    if(this.filteredReservations.length == 0)
      this.isEmpty = true;

    this._reservationService.confirmReservation(reservationId)
      .subscribe(() => {
        console.log('Reservation with id: ' + reservationId + 'has been confirmed');
      }); 
  }

  openRemoveDialog(reservationId: string): void {
    let dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
      data: {id: reservationId}
    });
 
    dialogRef.afterClosed().subscribe(result => {
        if(result == true)  {
          for(let reservation of this.filteredReservations) {
            if(reservation.id == reservationId)
              this.filteredReservations.splice(this.filteredReservations.indexOf(reservation), 1);
          }

          for(let reservation of this.reservations) {
            if(reservation.id == reservationId)
              this.reservations.splice(this.reservations.indexOf(reservation), 1);
          }

           if(this.filteredReservations.length == 0)
      this.isEmpty = true;


        this.openRemoveSnackBar();
        this._reservationService.deleteReservation(reservationId).subscribe(result => {
          console.log('Reservation with id: ' + reservationId + 'has been deleted');
        })
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

  openConfirmSnackBar() {
    this.snackBar.openFromComponent(ConfirmSnack, {
      duration: 1000,
    });
  }

  openRemoveSnackBar() {
    this.snackBar.openFromComponent(RemoveSnack, {
      duration: 1000
    });
  }
}