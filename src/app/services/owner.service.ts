import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Owner } from "../models/owner";

@Injectable()
export class OwnerService {
    constructor(private http: HttpClient) { }
 
    getAllOwners() {
        return this.http.get<Owner[]>('http://zakleptoapi.azurewebsites.net/api/owners');
    }
 
    getSingleOwner(login: string) {
        return this.http.get<Owner>('http://zakleptoapi.azurewebsites.net/api/owners/' + login);
    }
}