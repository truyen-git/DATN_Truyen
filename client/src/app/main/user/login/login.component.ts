import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { UserService } from '../../../shared/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent implements OnInit {
public tokenId: String;
  constructor(private userService: UserService, private authService: SocialAuthService,private http: HttpClient,private router : Router){}

  model ={
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit() {
    if(this.userService.isLoggedIn() )
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
  signInWithGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      console.log(userData);
      var tokenId = userData.idToken;
      this.userService.loginGG(tokenId).subscribe(
        res => {
          this.userService.setToken(res['token']);
          this.router.navigateByUrl('/userprofile');
        },err => {
          this.serverErrorMessages = err.error.message;
        }
        );
    }
    )
  }


}