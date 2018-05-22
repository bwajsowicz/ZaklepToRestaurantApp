import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  isConfirmButtonDisabled: boolean = true;;
  isEditButtonDisabled: boolean = false;
  isInputDisabled: boolean = true;
  employee: Employee;

  constructor(private _employeeService: EmployeeService) { 
    this.employee = new Employee();
    _employeeService.getSingleEmployee(localStorage.getItem("login")).subscribe(x => 
      {
        this.employee = x;
      }
    );
  }

  onEdit() {
    this.isInputDisabled = false;
    this.isConfirmButtonDisabled = false;
    this.isEditButtonDisabled = true;
  }

  onConfirm() {
    this.isInputDisabled = true;
    this.isConfirmButtonDisabled = true;
    this.isEditButtonDisabled = false;
  }
}