import { Injectable } from "@angular/core";
import { Employee } from "../models/employee";
import { HttpClient } from "@angular/common/http";
import { Reservation } from "../models/reservation";
import { map } from "rxjs/operators";

@Injectable()
export class ReservationService {
    constructor(private http: HttpClient) { }
 
    getAllReservationsForSpecificRestaurantAndDate(restaurantId: string, date: string) {
        return this.http.get<Reservation[]>('http://localhost:53993/api/reservations/' + restaurantId + "/" + date);
    }
 
    getSingleReservation(id: string) {
        return this.http.get<Reservation>('http://zakleptoapi.azurewebsites.net/api/reservations/' + id);
    }
}