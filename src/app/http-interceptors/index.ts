/* "Barrel" of Http Interceptors */
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {AuthInterceptor} from './auth-interceptor';
import {TimezoneInterceptor} from "./timezone-interceptor";
import {HttpsInterceptor} from "./https-interceptor";
import {ErrorInterceptor} from "./error-interceptor";

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: TimezoneInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptor, multi: true},
  //{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
];
