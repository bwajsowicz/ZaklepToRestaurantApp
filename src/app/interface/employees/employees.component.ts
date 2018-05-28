import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit() {
    this._employeeService.getAllEmployees()
      .subscribe(data => this.employees = data);
  }
}
