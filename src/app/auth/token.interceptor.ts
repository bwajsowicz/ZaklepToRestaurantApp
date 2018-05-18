import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private _authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): 
        Observable<HttpEvent<any>> {
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ${currentUser.token}'
                }
            });

            return next.handle(request);
        }
}