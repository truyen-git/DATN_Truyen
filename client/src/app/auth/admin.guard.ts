import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AdminService} from '../shared/admin.service';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private adminService : AdminService,private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.adminService.isLoggedIn() ) {
        this.router.navigateByUrl('/admin/admin-login');
        this.adminService.deleteToken();
        return false;
      }
    return true;
  }
}
