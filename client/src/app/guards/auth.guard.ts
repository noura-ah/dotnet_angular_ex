import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from "../services/auth.service";
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})

class PermissionsService {

  constructor(private router: Router,private auth: AuthService, private notify:NotifierService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.auth.isLoggedIn()){
        return true
      }
      this.notify.notify('error','you need to login in first')
      this.router.navigate(['login'])
      return false
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}
