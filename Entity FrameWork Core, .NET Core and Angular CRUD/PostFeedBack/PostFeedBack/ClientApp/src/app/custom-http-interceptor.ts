import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map, retry, tap } from 'rxjs/operators';
import { SpinnerService } from './spinner/spinner.service';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class CustomerHttpInterceptor implements HttpInterceptor {

  loaderActive = false;
  constructor(public spinnerService: SpinnerService,
    private spinner: NgxSpinnerService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //return undefined;

    //this.spinnerService.requestStarted();
    //this.spinner.show();
    //return next.handle(req)
    //  .pipe(

    //    tap(

    //      (event) => {

    //        if (event instanceof HttpResponse) {
    //          //this.spinnerService.requestEnded();
    //          this.spinner.hide();
    //          this.loaderActive = true;
    //        }
    //      },
    //      (error: HttpErrorResponse) => {
    //        retry(1);
    //        //this.spinnerService.requestEnded();
    //        this.spinner.hide();
    //        //this.loaderActive = false;
    //        throw error;
    //      }
    //      //catchError((error: HttpErrorResponse) => {
    //      //  alert('Http Error: ' + req.url);
    //      //  return throwError(error);
    //      //})

    //      //retry(1),
    //    ),

    //  );

    if (!this.loaderActive) {
      this.spinner.show();
      this.loaderActive = true;
    }
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loaderActive = true;
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          //this.authService.signoutLocally();
        }
        return throwError(error);
      }),
      finalize(() => {
        setTimeout(() => {
          this.spinner.hide();
        });
        this.loaderActive = false;
      })
    );
  }
}
