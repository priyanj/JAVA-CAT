import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../entity/user';
import { LocalStorageService } from '../utility/localStorage.service';


@Component({
    selector: 'app-header',
    templateUrl: '../view/header.component.html',
    styleUrls: ['../view/header.component.scss']
})
export class HeaderComponent {
    userName : string;
    clientName : string;
    user: User = new User();

    constructor(public router: Router, private myStorage:LocalStorageService,private translate:TranslateService) {}

    ngOnInit() {
       
        this.user=JSON.parse(localStorage.getItem('user'));   
        this.userName=this.user.username;
    }
    changeLang(language:string){
        this.translate.use(language);
        localStorage.setItem('language',language);
    }
    onLoggedout()
    {
        this.myStorage.clearCurrentUser();
        this.myStorage.clearLoggedIn();
    }
    
}
