import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken()

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}`, }
      })
    }
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {  //403
          return this.handleRefreshToken(request, next) 
        }
        return throwError( err );
      })
    );
  }

  handleRefreshToken(request: HttpRequest<unknown>, next: HttpHandler) {
    var id:any = this.auth.getId()
    
    return this.auth.generateRefreshToken(id).pipe(
      switchMap((res) => {
        this.auth.storeToken(res)
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${res}` }
        })
        return next.handle(request)
      }), catchError(err => {
        this.auth.signOut()
        return throwError(err)
      })
    )
  }
}
