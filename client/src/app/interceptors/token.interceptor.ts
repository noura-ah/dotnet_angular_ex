import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotifierService } from 'angular-notifier';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private notify:NotifierService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken()

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}`, }
      })
    }
    return next.handle(request).pipe(
      catchError(err => {
        const prevReq = err?.config
        if (err.status === 401  && !prevReq?.sent) {
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
        this.notify.notify('error', 'Please login again')
        return throwError(err)
      })
    )
  }
}
