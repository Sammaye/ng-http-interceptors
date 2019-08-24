import {Injectable} from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TimezoneInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Clone the request and set the new header in one step.
    const tzReq = req.clone({setHeaders: {'time-zone': this.convertTimezoneOffset()}});

    // send cloned request with header to the next handler.
    return next.handle(tzReq);
  }

  private convertTimezoneOffset = () : string => {
    // This is what should be happening, but some projects only accept the formatted style
    //return new Date().toString().match(/([-\+][0-9]+)\s/)[1];
    let offset = new Date().getTimezoneOffset(),
      second = offset * 60;

    let sign = second > 0 ? '-' : '+',
      hours = Math.abs(second / 3600),
      minutes = Math.abs(second / 60) % 60,
      tz;

    if (hours.toString().length === 1) {
      tz = `${sign}0${Math.floor(hours)}:${minutes}`
    } else {
      tz = `${sign}${Math.floor(hours)}:${minutes}`
    }

    if (minutes.toString().length === 1) {
      tz = tz.concat('0');
    }

    return tz;
  };
}
