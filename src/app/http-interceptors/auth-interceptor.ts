import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse
} from '@angular/common/http';

import {SessionService} from "../common/session.service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    let authToken = this.sessionService.access_token;

    // Clone the request and set the new header in one step.
    let authReq = req.clone(authToken ? {setHeaders: {'x-auth-token': authToken}} : {});

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      tap(
        response => {
          if (response instanceof HttpResponse) {
            if (response.body.access_token) {
              this.sessionService.access_token = response.body.access_token;
            }
          }
        },
        response => {
          if (
            response instanceof HttpErrorResponse &&
            response.status === 401
          ) {
            //this.sessionService.logout();
            //this.router.navigate(this.sessionService.getLoginUrl());
          }
        }
      )
    );
  }
}
