import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UserService } from '../service/user.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../utility/localStorage.service';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-user',
  templateUrl: '../view/user.component.html',
  styleUrls: ['../view/user.component.scss']
})
export class UserComponents implements OnInit {

  IpAddress: string;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  userData: any = [];

  constructor(private translate: TranslateService,private userService: UserService, public router: Router, private http: HttpClient, private myStorage: LocalStorageService) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'first_last_numbers',
      pageLength: 10,
      responsive: true
    };

    this.userService.getUsers().subscribe(result => {
      this.userData = result;
      console.log(result);
      this.dtTrigger.next();
    });

  }

  back() {
    this.router.navigate(['/dashboard']);
  }

}
