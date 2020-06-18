import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
/*import { UserfbService } from '../../../shared/userfb.service';*/
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
public userDetails;
public currentUser : any = {};
  
  constructor(private userService: UserService, /*private userfbService: UserfbService,*/ private router: Router) { }

  ngOnInit() {
    if(this.userService.getToken() !== '') {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => { 
        console.log(err);
        
      }
    );
  }
    /*this.userfbService.getCurrentUser().then(profile => this.currentUser = profile)
        .catch(() => this.currentUser = {});*/
}
onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/body']);
  }
}

