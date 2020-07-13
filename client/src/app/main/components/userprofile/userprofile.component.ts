import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  public userDetails;
  public currentUser : any = {};
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    
      this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => { 
        console.log(err);
        
      }
    );
   
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/body']);
  }

}
