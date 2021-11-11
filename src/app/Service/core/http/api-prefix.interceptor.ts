import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../authentication/token.service';
import { environment } from '../../../../environments/environment';


/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
    encodedToken: string;
    constructor(private tokenService: TokenService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //     if(request.url.includes("assets/i18n")){
        //  return;
        //     }
        // this.encodedToken = this.tokenService.getEncodedToken();
        
        if (!/^(http|https):/i.test(request.url)) {
            if (request.url.includes('login && tab_machine_list && oee_dashboard && production && check_status')) {
                request = request.clone({ url: environment.serverUrl + request.url });
            }
            else {
                this.encodedToken = this.tokenService.getEncodedToken(); 
                let headers: HttpHeaders = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.encodedToken}`
                });
                request = request.clone({ url: environment.serverUrl + request.url, headers });
            }
        }
        return next.handle(request);
    }
}


