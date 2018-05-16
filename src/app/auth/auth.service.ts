import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
    constructor(private helperService: JwtHelperService) { }

    public GetToken(): string {
        return localStorage.getItem('access_token');
    }

    public isAuthenticated(): boolean {
        const token = this.GetToken();

        return this.helperService.isTokenExpired(token); 
    }
}