import { Injectable } from "@angular/core";
import { Employee } from "../models/employee";
import { HttpClient } from "@angular/common/http";
import { Reservation } from "../models/reservation";

@Injectable()
export class ReservationService {
    constructor(private http: HttpClient) { }
 
    getAllReservations() {
        return this.http.get<Reservation[]>('http://zakleptoapi.azurewebsites.net/api/reservations');
    }
 
    getSingleReservation(id: string) {
        return this.http.get<Reservation>('http://zakleptoapi.azurewebsites.net/api/reservations/' + id);
    }
}