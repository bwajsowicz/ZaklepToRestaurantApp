import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { DataHandlerService } from '../../services/data-handler.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  isConfirmButtonDisabled: boolean = true;;
  isEditButtonDisabled: boolean = false;
  isInputDisabled: boolean = true;
  employee: Employee;

  constructor(private _dataHandler: DataHandlerService) { 
  }

  ngOnInit() {
    this._dataHandler.cast.subscribe(x => this.employee = x);
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