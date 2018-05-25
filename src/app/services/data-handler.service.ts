import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private employee = new BehaviorSubject<Employee>({
    login: "xD",
    firstName: "test",
    lastName: "test",
    email: "test",
    phone: "test",
    createdAt: null,
    restaurant: null
  });
  cast = this.employee.asObservable();

  constructor(private _employeeService: EmployeeService) { }

  setEmployee(login: string): void {
    this._employeeService.getSingleEmployee(login).subscribe(employee => this.employee.next(employee));
  }
}
