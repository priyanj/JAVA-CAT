import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../../../../router.animations';
import { UserService } from '../service/user.service';
import { LocalStorageService } from '../utility/localStorage.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: '../view/dashboard.component.html',
    styleUrls: ['../view/dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    isUser: string;
    userId: number;
    isAdmin: boolean;
    isActive: boolean = false;
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    firstName: String;
    lastName: String;
    redirectToDashboard: string;
    users: any;
    application: any = [];
    appCount : any = [];

    userCount: any=[];
 

    clientIdValue: number;


    constructor(private translate: TranslateService,private userService: UserService, public router: Router, private myStorage: LocalStorageService) {
    }

    download() {

    }

    ngOnInit() {
        
        // //this.clientIdValue = this.myStorage.getCurrentUserObject().clientId;
        this.redirectToDashboard = this.myStorage.getLoggedInTrue();
        if(this.redirectToDashboard != 'true')
        {
            this.router.navigate(['/login']);
            this.firstName = this.myStorage.getCurrentUserObject().firstName;
            this.lastName = this.myStorage.getCurrentUserObject().lastName;
        }

    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
