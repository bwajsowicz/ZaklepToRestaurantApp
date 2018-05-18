import { Component, OnChanges, AfterViewInit } from '@angular/core';
import { Employee } from '../models/employee';
import { OnInit } from '@angular/core';
import { AfterContentChecked } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [EmployeeService, AuthService, ReservationService]
})
export class DashboardComponent{
  employee: Employee;
  reservations: Reservation[];
  restaurant: string;
  loading: boolean = true;

  constructor(private _reservationService: ReservationService, private _employeeService : EmployeeService, private _authService: AuthService, private _router: Router) {
    this.employee = new Employee();
    console.log("ELLO");
    _employeeService.getSingleEmployee(localStorage.getItem("login"))
      .subscribe(x => {
                      this.employee = x;
                      this.restaurant = this.employee.restaurant.id;
                      console.log(this.restaurant);
                      _reservationService.getAllReservations()
                      .subscribe(reservations => {
                        this.reservations = reservations.filter(x => x.restaurant.id === this.restaurant);
                        this.loading = false;
                      });
      });
    
  }

  logout() {
    this._authService.logout();
    
    console.log("LOGOUT");
    this._router.navigateByUrl('/login');
  }
}
