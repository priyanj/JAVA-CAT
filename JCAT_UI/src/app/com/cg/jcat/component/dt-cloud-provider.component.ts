import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DTProvider } from '../entity/DTProvider';
import { DTProviderRuleService } from '../service/dt-provider-rule.service';


@Component({
  selector: 'app-for-cloud-provider',
  templateUrl: '../view/dt-cloud-provider.component.html',
  styleUrls: ['../view/dt-cloud-provider.component.scss']
})
export class ForCloudProviderComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  cloudProvider : DTProvider;
   value1: string;

  AllData : any = [];
  constructor(private forCloudProviderService : DTProviderRuleService,public router: Router,private http: HttpClient) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true};
      this.forCloudProviderService.getCloudProvider().subscribe(result => 
        {
        this.AllData = result ;
        this.dtTrigger.next();
        });
  }


  setEvaluationOrder(){
    this.router.navigate(['/for-cloud-provider/app-set-evaluation-order']);
  }

  addRule(providerId:number){
    this.forCloudProviderService.sendProviderIdtoProviderRuleComponent(providerId);
    this.router.navigate(['/dt-cloud-provider/dt-cloud-provider-rule']);

  }

}
