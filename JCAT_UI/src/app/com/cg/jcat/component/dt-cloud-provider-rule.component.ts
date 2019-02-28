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
  allProviderRules: any = [];
  providerAllData: any = [];
  originalQuestions: any = [];
  providerQuestionLength: number;
  id: number;
  providerIdValue: any;
  clickedValue: boolean = false;
  eventValue: number;
  rule: DTProviderRule = new DTProviderRule();
  clickedReversedValue: boolean = false;

  constructor(private dtProviderRuleService: DTProviderRuleService, public router: Router, private myStorage: LocalStorageService) { }
 

  ngOnInit() {
    this.providerIdValue= this.myStorage.getProviderId();
    // this.dtProviderRuleService.providerId.subscribe(data => { this.providerIdValue = data; });
    this.dtProviderRuleService.getProviderQuestions().subscribe(result => {
      this.providerAllData = result ;
      this.originalQuestions = result ;
      this.providerQuestionLength = this.providerAllData.length;
      
      this.dtProviderRuleService.getCloudProviderRules(this.providerIdValue).subscribe(data => { this.allProviderRules = data
      
        for (let index1 = 0; index1 <this.allProviderRules.length; index1++) {
        for (let index = 0; index < this.providerAllData.length; index++) {
         
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

  // setClickedRow(event: any) {
  //   this.originalQuestions.splice(event, 1);
  // }

  onClickAddrule(questionObj: any, index: number) {
    this.clickedValue = true;
    this.rule = questionObj;
    this.eventValue = index;
  }

  clicked() {
    if(this.clickedValue){
    var ins = this.savedProviderRule.length;
    this.savedProviderRule[ins] = this.rule;
    this.originalQuestions.splice(this.eventValue, 1);

    this.unAnswered[this.unAnswered.length]=this.savedProviderRule[ins].questionId;
  }
  this.clickedValue=false;
  }

  onClickRule(questionObj: any, index: number) {
    this.id = questionObj.questionId;
    this.clickedReversedValue = true;
    this.rule = questionObj;
    this.eventValue = index;
  }

  reverceClicked() {
    if(this.clickedReversedValue)
    {
    this.originalQuestions[this.originalQuestions.length] = this.rule;
    this.savedProviderRule.splice(this.eventValue, 1);
    for (let index = 0; index < this.allProviderRules.length; index++) {
      if (this.allProviderRules[index].questionId === this.rule.questionId) {
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

  selectChangeHandler(optionObject, event,questionObj) {
    let flag = 0;
    if (event.target.checked) {
      for (let index = 0; index < this.allProviderRules.length; index++) {
        if (this.allProviderRules[index].questionId == questionObj.questionId) {
          this.allProviderRules[index].ruleOptionTextEN = this.allProviderRules[index].ruleOptionTextEN + "," + optionObject.optionTextEN;
          this.allProviderRules[index].ruleOptionIds = this.allProviderRules[index].ruleOptionIds + "," + optionObject.optionId;
          this.allProviderRules[index].modifiedBy = this.myStorage.getCurrentUserObject().username;
          flag++;
        }
      }
      if (flag == 0) {
        let providerRuleNewObject: DTProviderRule = new DTProviderRule();
        providerRuleNewObject.questionId = questionObj.questionId;
        providerRuleNewObject.providerId = this.providerIdValue;
        providerRuleNewObject.ruleOptionTextEN = optionObject.optionTextEN;
        providerRuleNewObject.evaluationOrder = 0;
        providerRuleNewObject.questiontextEN = questionObj.questiontextEN;
        providerRuleNewObject.ruleOptionIds = String(optionObject.optionId);
        providerRuleNewObject.createdBy = this.myStorage.getCurrentUserObject().username;
        this.allProviderRules[this.allProviderRules.length] = providerRuleNewObject;
      }
      for (let index = 0; index < this.unAnswered.length; index++) {
                  
        if(this.unAnswered[index]===questionObj.questionId)
        {
          this.unAnswered.splice(index,1);
        }
    }
    }
    else {
      for (let index = 0; index < this.allProviderRules.length; index++) {

        if (this.allProviderRules[index].questionId === questionObj.questionId) {
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
              this.unAnswered[this.unAnswered.length]=questionObj.questionId;
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