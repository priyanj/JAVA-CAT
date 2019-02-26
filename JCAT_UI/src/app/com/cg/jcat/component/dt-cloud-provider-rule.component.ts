import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  savedProviderRule:any=[];
  expand:boolean=false;
  unAnswered:any=[];
  flag2:number=0;

  shiftToFirstTable: boolean = false;
  allProviderRules: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  providerAllData: any = [];
  originalQuestions: any = [];
  // rulesQuestion: any = [];
  providerQuestionLength: number;
  index: number = 0;
  value: boolean = false;
  idvalue: boolean = false;
  id: number;
  RuleId = 0;
  checked: boolean = false;
  constructor(private dtProviderRuleService: DTProviderRuleService, public router: Router, private http: HttpClient, private myStorage: LocalStorageService) { }
  providerIdValue: any;
  clickedValue: boolean = false;
  eventValue: number;
  rule: DTProviderRule = new DTProviderRule();
  clickedReversedValue: boolean = false;

  ngOnInit() {
    this.shiftToFirstTable = false;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true
    };
    this.providerIdValue= this.myStorage.getProviderId();
    console.log(this.providerIdValue);
    // this.dtProviderRuleService.providerId.subscribe(data => { this.providerIdValue = data; });
    this.dtProviderRuleService.getProviderQuestions().subscribe(result => {
      this.dtTrigger.next();
      this.providerAllData = result ;
      this.originalQuestions = result ;
      this.providerQuestionLength = this.providerAllData.length;
      this.dtProviderRuleService.getCloudProviderRules(this.providerIdValue).subscribe(data => { this.allProviderRules = data
      
        for (let index = 0; index < this.providerAllData.length; index++) {
          for (let index1 = 0; index1 < this.allProviderRules.length; index1++) {
            if(this.providerAllData[index].questionId===this.allProviderRules[index1].questionId)
            {
              this.savedProviderRule[this.savedProviderRule.length]=this.providerAllData[index];
              this.providerAllData.splice(index,1);
            }
          }
          
        }

      });
    });
    

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
    this.clickedValue = true;
    this.rule = event;
    this.eventValue = event1;
  }

  clicked() {
    this.value = true;
    if(this.clickedValue){
    var ins = this.savedProviderRule.length;
    this.savedProviderRule[ins] = this.rule;
    this.originalQuestions.splice(this.eventValue, 1);

    this.unAnswered[this.unAnswered.length]=this.savedProviderRule[ins].questionId;

  }
  this.clickedValue=false;
  }

  onClickRule(event2: any, event: any, event1: number) {
    this.idvalue = true;
    this.id = event;
    this.clickedReversedValue = true;
    this.rule = event2;
    this.eventValue = event1;
  }

  reverceClicked() {
    if(this.clickedReversedValue)
    {
    var x = this.originalQuestions.length;
    this.originalQuestions[x] = this.rule;
    this.savedProviderRule.splice(this.eventValue, 1);
    for (let index = 0; index < this.allProviderRules.length; index++) {
      if (this.allProviderRules[index].questionTextEN == this.rule.questiontextEN) {
        this.allProviderRules.splice(index, 1);
      }
    }
  }
    this.clickedReversedValue=false;
  }

  hideall(){
    for (let index = 0; index < this.savedProviderRule.length; index++) {
      this.expand=false;
      
    }
  }
  expandall(){
    for (let index = 0; index < this.savedProviderRule.length; index++) {
      this.expand=true;
      
    }
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
        providerRuleNewObject.ruleOptionIds = String(optionObject.optionId);
        this.allProviderRules[this.allProviderRules.length] = providerRuleNewObject;
      }
      for (let index = 0; index < this.unAnswered.length; index++) {
                  
        if(this.unAnswered[index]===qid)
        {
          this.unAnswered.splice(index,1);
        }
    }
    }
    else {
      for (let index = 0; index < this.allProviderRules.length; index++) {

        if (this.allProviderRules[index].questionId === qid) {
          this.allProviderRules[index].ruleOptionIds = this.allProviderRules[index].ruleOptionIds.replace(optionObject.optionId+",",'');
          this.allProviderRules[index].ruleOptionIds = this.allProviderRules[index].ruleOptionIds.replace("," + optionObject.optionId,'');
          this.allProviderRules[index].ruleOptionTextEN = this.allProviderRules[index].ruleOptionTextEN.replace(optionObject.optionTextEN + ",",'');
          this.allProviderRules[index].ruleOptionTextEN = this.allProviderRules[index].ruleOptionTextEN.replace(","+optionObject.optionTextEN,'');
          this.allProviderRules[index].ruleOptionTextEN = this.allProviderRules[index].ruleOptionTextEN.replace(optionObject.optionTextEN,'');
          this.allProviderRules[index].ruleOptionIds = this.allProviderRules[index].ruleOptionIds.replace(optionObject.optionId,'');
          
          if(this.allProviderRules[index].ruleOptionIds.length<=0)
          {
            this.flag2=1;
          }
        }
      }
      if(this.flag2===1)
              {
              this.unAnswered[this.unAnswered.length]=qid;
              this.flag2=0;
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
    if(this.unAnswered.length===0){
    this.dtProviderRuleService.saveCloudProviderRule(this.allProviderRules).subscribe(
    );
    location.reload();
  }else{
    alert("Some questions are unanswered");
  }
  
  }

  checkValid(qid)
  {
    for (let index1 = 0; index1 < this.unAnswered.length; index1++) {
    if(this.unAnswered[index1]===qid)
      {
        return qid;
      }
  }
  }

}