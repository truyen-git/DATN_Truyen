import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { AdminService } from '../../shared/admin.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private adminService: AdminService, private router : Router ) { }
  model ={
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  ngOnInit() {
  	if(this.adminService.isLoggedIn())
    this.router.navigateByUrl('/admin/typography');
  }

  onSubmit(form : NgForm){
    this.adminService.loginAdmin(form.value).subscribe(
      res => {
        this.adminService.setToken(res['token']);
        
          this.router.navigateByUrl('/admin/typography');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}
