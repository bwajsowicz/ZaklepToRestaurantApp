import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }

    login(login: string, password: string) {
        return this.http.post("http://zakleptoapi.azurewebsites.net/api/employee/login", {login: login, password: password})
        .pipe(map(user => {
            localStorage.setItem('token', JSON.stringify(user));
        }));
    }

    logout() {
        localStorage.removeItem('token');
    }
}