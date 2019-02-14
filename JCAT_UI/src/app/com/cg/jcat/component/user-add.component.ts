import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../entity/user';
import { UserService } from '../service/user.service';
import { LocalStorageService } from '../utility/localStorage.service';

@Component({
  selector: 'app-add-user',
  templateUrl: '../view/user-add.component.html',
  styleUrls: ['../view/user-add.component.scss']
})
export class AddUserComponent implements OnInit {
  user: User;
  AllData :  any  =  [];
  IpAddress: string;
  userName: string;
  status: boolean = true;
  userTypeValue: boolean = false;
  userType: string = "User";
  clientIdValue: number;

  count: number = 0;

  constructor(private userService: UserService, public router: Router, private myStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.userService.getIpAddress().subscribe(data => {
      this.myStorage.setIpAddress(data['ip']);
    });

    this.userService.getUsers().subscribe(result  => {
      this.AllData  =  result ;
    });
  }

  addUserComponent(formvalues) {
    this.user = formvalues;
    this.user.isAdmin = this.userTypeValue;
    this.userName = formvalues.userName;
    for (let index = 0; index < this.AllData.length; index++) {
      if (this.userName === this.AllData[index].userName) {
        this.status = false;
        alert("User already exits, please enter a new name");
        location.reload();
        this.router.navigate(['/user']);
      }
    }
    if (this.status) {
      //this.user.ipAddress = this.myStorage.getIpAddress();
      this.user.createdBy = this.myStorage.getCurrentUserObject().username;
      this.userService.addUser(this.user).subscribe();
      location.reload();
      this.router.navigate(['/user']);
    }
  }

  selectChangeHandler(event: any) {
    if (event.target.value == "User") {
      this.userTypeValue = false;
      this.user.isAdmin = false;
      this.userType = "User";
    }
    else {
      this.userTypeValue = true;
      this.user.isAdmin = true;
      this.userType = "Admin";
    }
  }

}
