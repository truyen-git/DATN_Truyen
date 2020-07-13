import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../shared/admin.service';
import { Router } from "@angular/router";

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    /*{ path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },*/
   /* { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },*/
    { path: '/table-list', title: 'Quản lý khách hàng',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Quản lý khóa học',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Quản lý hóa đơn',  icon:'bubble_chart', class: '' },
    /*{ path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },*/
    /*{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  onLogout(){
  this.adminService.deleteToken();
  this.router.navigate(['/admin/admin-login']);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
