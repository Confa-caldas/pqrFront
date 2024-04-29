import { Router } from '@angular/router';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, finalize, Observable, retry, throwError } from 'rxjs';

import { NgxSpinnerService } from 'ngx-spinner';
import { SessionStorageItems } from '../../enums/session-storage-items.enum';
import { RoutesApp } from '../../enums/routes.enum';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  intercept(requestIn: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    const sessionToken = sessionStorage.getItem(SessionStorageItems.SESSION);
    let token;
    if (sessionToken) {
      token = sessionToken;
    }
    let requestOut = requestIn;
    if (token && !requestOut.url.includes('.s3.amazonaws.com')) {
      requestOut = requestOut.clone({
        headers: requestOut.headers.set('Authorization', `${token}`),
      });
    }

    return next.handle(requestOut).pipe(
      retry({ count: 2, delay: 1000 }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.spinner.hide();
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate([RoutesApp.LOGOUT]);
        }
        return throwError(() => new Error('The Error'));
      }),
      finalize(() => {
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      })
    );
  }
}
