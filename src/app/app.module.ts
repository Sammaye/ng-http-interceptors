import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {httpInterceptorProviders} from "./http-interceptors";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: []
})
export class AppModule {
}
