import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { User } from '../../main/models/user.model';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
     userList : User[] = [];
  constructor(private userService : UserService) { }

  ngOnInit() {
  	this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users: any) => {
      this.userList = users.data;
      console.log(users);
    }, (err) => {
      console.log(err)
    })
  }

}
