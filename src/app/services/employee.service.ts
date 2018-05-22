import { Injectable } from "@angular/core";
import { Employee } from "../models/employee";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class EmployeeService {
    constructor(private http: HttpClient) { }
 
    getAllEmployees() {
        return this.http.get<Employee[]>('http://localhost:53993/api/employee');
    }
 
    getSingleEmployee(login: string) {
        return this.http.get<Employee>('http://localhost:53993/api/employee/' + login);
    }
}