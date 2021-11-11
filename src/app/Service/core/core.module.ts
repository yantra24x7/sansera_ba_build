import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule } from '@angular/router';
import { SuccessErrorHandlerInterceptor } from './http/success-error-handler.interceptor';
import { AuthGuard } from '../core/authentication/auth.guard';
import { ApiPrefixInterceptor } from '../core/http/api-prefix.interceptor';
import { TokenService } from '../core/authentication/token.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [
    AuthGuard,
    ApiPrefixInterceptor,
    SuccessErrorHandlerInterceptor,
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SuccessErrorHandlerInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
