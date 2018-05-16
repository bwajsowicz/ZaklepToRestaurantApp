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
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ${this.auth.GetToken()}'
                }
            });

            return next.handle(request);
        }
}