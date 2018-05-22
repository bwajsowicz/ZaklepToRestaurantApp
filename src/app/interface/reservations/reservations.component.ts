import { Component } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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

  constructor(private _reservationService: ReservationService, private _employeeService : EmployeeService, private _authService: AuthService, private _router: Router) {
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
        this.reservations = reservations.filter(x => x.restaurant.id === this.restaurantId);
        
        for(let reservation of reservations) 
        {
          let dateString = reservation.dateStart.toString();
          reservation.dateStart = new Date(dateString);
          console.log(reservation.dateStart.toJSON());
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

    this.updateReservations();
  }
}
