import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import {concatMap, delay, retry, retryWhen, take, tap} from "rxjs/operators";
import {throwError} from 'rxjs';
import {NotificationsService} from "../common/notifications.service";

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private notificationsService: NotificationsService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      retryWhen(errors => errors.pipe(delay(1000), take(3)/*, concatMap(throwError('ddd'))*/)),
      //retry(3),
      tap(
        next => {
        },
        error => {
          //this.notificationsService.error('Error!', 'There was an error.', 1000);
          throwError(error);
          console.log(error);
        }
      )
    );
  }
}
