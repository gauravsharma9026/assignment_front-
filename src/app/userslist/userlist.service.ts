import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserlistService {

 // private users: User[] = [];
 private users: User[] = [];
  private usersUpdated = new Subject<{users: User[], userCount: number}>();

  constructor(private http: HttpClient, private router: Router) { }
  getUsers(usersPerPage: number,currentPage: number){
    const queryParam = `?pagesize=${usersPerPage}&page=${currentPage}`;
    return this.http.get<{message: string,users: any,maxUsers: number}>('http://localhost:3000/api/users' + queryParam)
    .pipe(map((userData) => {
      return {
        users: userData.users.map(user => {
          return {
            name: user.name,
            address: user.address,
            id: user._id,
            phone: user.phone,
            salary: user.salary  
          };
        }),
        maxPosts: userData.maxUsers
      };
    }))
   .subscribe((transformedusers) => {
     console.log(transformedusers);
     this.users = transformedusers.users;
    this.usersUpdated.next({users:[...this.users],userCount: transformedusers.maxPosts });
   });
  }

  getUserUpdatedListner(){
    return this.usersUpdated.asObservable();
  }

}
