import { Injectable } from "@angular/core";
import { Employee } from "../models/employee";
import { HttpClient } from "@angular/common/http";
import { interval } from "rxjs";
import { switchMap } from "rxjs/internal/operators/switchMap";

@Injectable()
export class EmployeeService {
    constructor(private http: HttpClient) { }
 
    getAllEmployees() {   
        //return this.http.get<Employee[]>('http://localhost:53993/api/employee');
        return this.http.get<Employee[]>('https://zakleptoapi.azurewebsites.net/api/employee');
        
    }
 
    getSingleEmployee(login: string) {
        //return this.http.get<Employee>('http://localhost:53993/api/employee/' + login);
        return this.http.get<Employee>('https://zakleptoapi.azurewebsites.net/api/employee/' + login);        
    }
}