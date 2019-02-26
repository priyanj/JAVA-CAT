import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { User } from '../entity/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../utility/localStorage.service';


@Component({
  selector: 'app-login',
  templateUrl: '../view/login.component.html',
  styleUrls: ['../view/login.component.scss'],
  animations: [routerTransition()]
})
export class JCATLoginComponent implements OnInit {
      message:String;
      users: User = new User();
      userId:string;
      
       constructor(private loginService :UserService,public router: Router,private myStorage:LocalStorageService) {}
   
       ngOnInit() {
   }
   
       onLoggedin(formValues) { 
            this.loginService.getUserByUserNamePassword(formValues.userName,formValues.password).subscribe((data)=>{
            this.users=data;
  
               if( this.users!=null)
               {
                   this.myStorage.setCurrentUserObject(this.users);
                   this.myStorage.setLoggedInTrue('true');
                   if(this.users.isAdmin)
                   {
                    this.loginService.sendMsgtoOtherComponent(this.users.userId);
                    this.loginService.sendMsgtoOtherComponent(this.users);
                    this.router.navigate(['/dashboard']);
                   }
                   else{
                    this.message="logged in successfully";
                    this.loginService.sendMsgtoOtherComponent(this.users);
                    this.router.navigate(['/dashboard']);
                   }
               }
               else
               {
                   alert("Please enter correct username and Password");
               }
               
           }
           
           );
   }
   
   }