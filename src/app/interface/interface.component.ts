import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css'],
  providers: [ EmployeeService, AuthService ]
})
export class InterfaceComponent {
  employee: Employee;
  xd1: boolean = true;
  xd2: boolean = false;

  constructor(private _employeeService : EmployeeService, private _authService: AuthService, private _router: Router) {
    this.employee = new Employee();

    _employeeService.getSingleEmployee(localStorage.getItem("login"))
      .subscribe(x => {this.employee = x;}); 
  }

  logout() {
    this._authService.logout();
    this._router.navigateByUrl('/login');
  }

  click1() {
    this.xd1 = true;
    this.xd2 = false;
  }
  
  click2() {
    this.xd1 = false;
    this.xd2 = true;
  }
}
