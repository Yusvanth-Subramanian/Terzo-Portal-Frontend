import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class ExpiredJwtHandler implements HttpInterceptor{

  constructor(private router: Router) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
