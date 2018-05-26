import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { DataHandlerService } from '../services/data-handler.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css'],
  providers: [ EmployeeService, AuthService ]
})
export class InterfaceComponent implements OnInit {
  employee: Employee;

  constructor(private _dataHandler: DataHandlerService, private _authService: AuthService, private _router: Router) {
  }

  ngOnInit() {
    this._dataHandler.cast.subscribe(x => this.employee = x); 
  }

  logout() {
    this._authService.logout();
    this._router.navigateByUrl('/login');
  }
}
