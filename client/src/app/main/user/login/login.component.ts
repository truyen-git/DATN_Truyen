import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from '../../../shared/user.service';
/*import { UserfbService } from '../../../shared/userfb.service';*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private userService: UserService,/*private userfbService: UserfbService,*/private router : Router) { }

  model ={
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit() {
    if(this.userService.isLoggedIn() /*|| this.userfbService.isLoggedIn()*/)
    this.router.navigateByUrl('/userprofile');
  }

  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        if(this.model.email == "admin@admin.com" && this.model.password == "123456") {
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.router.navigateByUrl('/userprofile');
        }
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  /*fbLogin() {
    this.userfbService.fbLogin().then(() => {
      console.log('User has been logged in');
      this.router.navigate(['/userprofile']);
    });  }*/

}