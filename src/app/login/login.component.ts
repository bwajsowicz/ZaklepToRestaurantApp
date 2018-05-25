import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { AuthService } from '../auth/auth.service';
import { DataHandlerService } from '../services/data-handler.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})

export class LoginComponent implements OnInit{
  model: any = {};
  constructor(private fb: FormBuilder, private router: Router, 
  private _authService: AuthService, private _dataHandler: DataHandlerService) { }
  employee: Employee;
  loading: boolean;

  ngOnInit() {
    this.loading = false;
    this._authService.logout();  
  }

  login() {
    this.loading = true;
    this._authService.login(this.model.login, this.model.password)
      .subscribe(
                data => {
                    console.log("DATA");
                    localStorage.setItem("login", this.model.login);
                    this._dataHandler.setEmployee(this.model.login);
                    this.router.navigate(["interface"], { replaceUrl: true });
                },
                error => {
                    this.loading = false;
                    console.log("ERROR");
                });
  }
}
