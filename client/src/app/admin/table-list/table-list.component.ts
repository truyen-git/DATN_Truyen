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
     teamList = [];
     public searchText; 
  constructor(private userService : UserService) { }

  ngOnInit() {
  	this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users: any) => {
      this.userList = users.data;
      this.teamList = users.data;
      console.log(users);
    }, (err) => {
      console.log(err)
    })
  }

  remove(userId){
    /*console.log(productId)*/
    var r = confirm("Bạn chắc chắn xóa tài khoản này?")
    if(r == true){
      this.userService.deleteUsers(userId).subscribe(rs => {
        /*console.log(this.productItems)*/
        
        location.reload();
        this.teamList = this.teamList.filter(e => e._id != userId)
      }, (err) => {
        console.log(err)
      });
    }
  }

}
