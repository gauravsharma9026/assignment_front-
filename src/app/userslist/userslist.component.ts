import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserlistService } from './userlist.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {
  users: User[]  = [];
  totalUsers = 0;
  usersPerPage = 2;
  currentPage= 1;
  pageSizeOptions = [1, 2, 5, 10];

  displayedColumns: string[] = ['name', 'address', 'phone', 'salary'];
  userss = {};
  
  private usersSub: Subscription;
  constructor(public UserlistService: UserlistService) { }

  ngOnInit(): void {
    this.UserlistService.getUsers(this.usersPerPage,this.currentPage);
    this.usersSub = this.UserlistService.getUserUpdatedListner()
    .subscribe((usersData: {users: User[],userCount: number}) =>{
      this.users = usersData.users;
      this.totalUsers = usersData.userCount;
    });
  }

  onChangePage(pageData: PageEvent){
  
    this.currentPage = pageData.pageIndex + 1;
    this.usersPerPage = pageData.pageSize;
    this.UserlistService.getUsers(this.usersPerPage,this.currentPage);
  }

}
