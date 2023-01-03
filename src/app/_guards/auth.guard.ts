import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {map, Observable} from 'rxjs';
import {AccountService} from "../_services/account.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private account: AccountService, private toast: ToastrService) {
}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {
    return this.account.CurrentUser$.pipe(map(data  => {
      if (data) return true
      else {
        this.toast.error("You Shall not pass!");
        return false;
      }
    } ))
  }

}
