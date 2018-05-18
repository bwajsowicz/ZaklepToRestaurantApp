import { CanActivate } from "@angular/router";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _router: Router) { }
    canActivate(): boolean {
        if (localStorage.getItem('token')) {
            return true;
        }

        this._router.navigate(['/login']);
        return false;
    }
}