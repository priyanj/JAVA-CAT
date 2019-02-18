import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../../node_modules/@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../utility/localStorage.service';
import { DTProviderRuleService } from '../service/dt-provider-rule.service';
import { DTProviderRule } from '../entity/DTProviderRule';



@Component({
  selector: 'dt-cloud-provider-rule',
  templateUrl: '../view/dt-cloud-provider-rule.component.html',
  styleUrls: ['../view/dt-cloud-provider-rule.component.scss']
})
export class DTCloudProviderComponentRule implements OnInit {
  shiftToFirstTable:boolean=false;
  allProviderRules: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  providerAllData: any = [];
  originalQuestions: any = [];
  rulesQuestion: any = [];
  providerQuestionLength: number;
  index: number = 0;
  value: boolean = false;
  idvalue: boolean = false;
  id: number;
  constructor(private dtProviderRuleService: DTProviderRuleService, public router: Router, private http: HttpClient, private myStorage: LocalStorageService) { }
  providerIdValue: any;

  ngOnInit() {
    this.shiftToFirstTable=false;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true
    };
    this.dtProviderRuleService.providerId.subscribe(data => { this.providerIdValue = data; });
    this.dtProviderRuleService.getProviderQuestions().subscribe(result => {
      this.dtTrigger.next();
      this.providerAllData = result ;
      this.originalQuestions = result ;
      this.providerQuestionLength = this.providerAllData.length;
    });
    this.dtProviderRuleService.getCloudProviderRules(this.providerIdValue).subscribe(data => { this.allProviderRules = data });
    
  }

  Cancel() {
    this.router.navigate(['/dt-cloud-provider']);
  }

  addQuestions() {
    this.router.navigate(['/assessment-questions/add-assessment-question']);
  }
  setClickedRow(event: any) {
    this.originalQuestions.splice(event, 1);
  }
  onClickAddrule(event: any, event1: number) {
    this.value = true;
    this.rulesQuestion[this.index] = event;
    this.originalQuestions.splice(event1, 1);
    this.index++;
  }
  onClickRule(event: any, event1: number) {
    // console.log("***************************888")
    // this.shiftToFirstTable=false;
    
    this.idvalue = true;
    this.id = event.questionId;
  }

  selectChangeHandler(optionObject, event, qid, qtext) {
    let flag = 0;
    if (event.target.checked) {
      for (let index = 0; index < this.allProviderRules.length; index++) {
        if (this.allProviderRules[index].questionId == qid) {
          this.allProviderRules[index].ruleOptionTextEN = this.allProviderRules[index].ruleOptionTextEN + "," + optionObject.optionTextEN;
          this.allProviderRules[index].ruleOptionIds = this.allProviderRules[index].ruleOptionIds + "," + optionObject.optionId;
          flag++;
        }
      }
      if (flag == 0) {
        let providerRuleNewObject: DTProviderRule = new DTProviderRule();
        providerRuleNewObject.questionId = qid;
        providerRuleNewObject.providerId = this.providerIdValue;
        providerRuleNewObject.ruleOptionTextEN = optionObject.optionTextEN;
        providerRuleNewObject.evaluationOrder = 0;
        providerRuleNewObject.questiontextEN = qtext;
        providerRuleNewObject.ruleOptionIds = optionObject.optionId
        this.allProviderRules[this.allProviderRules.length] = providerRuleNewObject;
      }
    }
    else {
      for (let index = 0; index < this.allProviderRules.length; index++) {

        if (this.allProviderRules[index].questionId === qid) {
          this.allProviderRules[index].ruleOptionTextEN = this.allProviderRules[index].ruleOptionTextEN.replace("," + optionObject.optionTextEN, '');
          this.allProviderRules[index].ruleOptionIds = this.allProviderRules[index].ruleOptionIds.replace("," + optionObject.optionId + ",", '');
          this.allProviderRules[index].ruleOptionIds = this.allProviderRules[index].ruleOptionIds.replace("," + optionObject.optionId, '');
          this.allProviderRules[index].ruleOptionTextEN = this.allProviderRules[index].ruleOptionTextEN.replace(optionObject.optionTextEN, '');
          this.allProviderRules[index].ruleOptionTextEN = this.allProviderRules[index].ruleOptionTextEN.replace(optionObject.optionTextEN + ",", '');
          this.allProviderRules[index].ruleOptionIds = this.allProviderRules[index].ruleOptionIds.replace(optionObject.optionId + ",", '');
        }
      }
    }

  }

  RuleChecked(opnObject, qid) {
    for (let index = 0; index < this.allProviderRules.length; index++) {
      if (this.allProviderRules[index].providerId == this.providerIdValue) {
        if (qid == this.allProviderRules[index].questionId) {
          if (this.allProviderRules[index].ruleOptionIds.includes(opnObject.optionId)) {
            return true;
          }
        }
      }
    }

  }

  saveRule() {
    this.dtProviderRuleService.saveCloudProviderRule(this.allProviderRules).subscribe(
    );
  }

}