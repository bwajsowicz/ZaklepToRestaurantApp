import { Injectable } from "@angular/core";
import { Employee } from "../models/employee";
import { HttpClient } from "@angular/common/http";
import { Reservation } from "../models/reservation";
import { map } from "rxjs/operators";
import { interval } from "rxjs";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ReservationService {
    constructor(private http: HttpClient) { }
 
    getAllReservationsForSpecificRestaurantAndDate(restaurantId: string, date: string) {
        //return this.http.get<Reservation[]>('http://localhost:53993/api/reservations/' + restaurantId + "/" + date);
        return this.http.get<Reservation[]>('http://zakleptoapi.azurewebsites.net/api/reservations/' + restaurantId + "/" + date);
        
    }

    getAllUnconfirmedReservationsForSpecificRestaurant(restaurantId: string) {
        //return interval(1000).pipe(switchMap(() => this.http.get<Reservation[]>("http://localhost:53993/api/reservations/specific-restaurant/" + restaurantId)));
        return interval(1000).pipe(switchMap(() => this.http.get<Reservation[]>("http://zakleptoapi.azurewebsites.net/api/reservations/specific-restaurant/" + restaurantId)));        
    }
 
    getSingleReservation(id: string) {
        //return this.http.get<Reservation>('http://localhost:53993/api/reservations/' + id);
        return this.http.get<Reservation>('http://zakleptoapi.azurewebsites.net/api/reservations/' + id);        
    }

    confirmReservation(id: string) {
        return this.http.post('http://zakleptoapi.azurewebsites.net/api/reservations/' + id + '/activate', null);
    }

    deleteReservation(id: string) {
        return this.http.delete('http://zakleptoapi.azurewebsites.net/api/reservations/' + id + '/remove');
    }
}
