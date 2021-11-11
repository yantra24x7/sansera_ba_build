import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService  } from '../authentication/token.service';
import { Logger } from '../logger.service';


const log = new Logger('AuthenticationGuard');


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router, private tokenService: TokenService) { }

  
  canActivate(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): boolean {
    if (this.tokenService.isTokenValidated() ) {
        return true;
    }
    log.debug('Not authenticated, redirecting and adding redirect url...');
   this.route.navigateByUrl('');
    return false;
}
  
}
