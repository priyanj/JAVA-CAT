import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DTMigrationRuleService } from '../service/dt-migration-rule.service';
import { LocalStorageService } from '../utility/localStorage.service';
import { DTMigrationRule } from '../entity/DTMigrationRule';

@Component({
  selector: 'app-migration-patterns',
  templateUrl: '../view/dt-migration-pattern-rule.component.html',
  styleUrls: ['../view/dt-migration-pattern-rule.component.scss']
})
export class DTMigrationPatternComponentRule implements OnInit {

  savedMigrationQuestion:any=[];
  expand:boolean=false;
  unAnswered:any=[];
  flag2:number=0;
  clickedValue: boolean = false;
  eventValue: number;
  rule: DTMigrationRule = new DTMigrationRule();
  clickedReversedValue: boolean = false;
  allMigrationRules: any = [];
  migrationAllData: any = [];
  originalQuestions: any = [];
  rulesQuestion: any = [];
  id: number;
  migrationIdValue: any;
  constructor(private forMigrationPatternService: DTMigrationRuleService, public router: Router, private myStorage: LocalStorageService) { }
 

  ngOnInit() {
    this.migrationIdValue = this.myStorage.getMigrationId();
    // this.forMigrationPatternService.migrationId.subscribe(data => { this.migrationIdValue = data; });
    this.forMigrationPatternService.getMigrationQuestions().subscribe(result => {
      this.migrationAllData = result ;
      this.originalQuestions = result ;
      this.forMigrationPatternService.getMigrationRule(this.migrationIdValue).subscribe(data => { this.allMigrationRules = data
        for (let index1 = 0; index1 < this.allMigrationRules.length; index1++) {
        for (let index = 0; index < this.migrationAllData.length; index++) {
        
           if(this.migrationAllData[index].questionId===this.allMigrationRules[index1].questionId)
           {
             this.savedMigrationQuestion[this.savedMigrationQuestion.length]=this.migrationAllData[index];
             this.migrationAllData.splice(index,1);
           }
         }    
        }
      });
    });  
  }

  Cancel() {
    this.router.navigate(['/for-migration-pattern']);
  }
 
  onClickAddrule(questionObj: any, index: number) {

    this.clickedValue = true;
    this.rule = questionObj;
    this.eventValue = index;
  }
  hideall(){
    for (let index = 0; index < this.savedMigrationQuestion.length; index++) {
      this.expand=false;   
    }
  }
  expandall(){
    for (let index = 0; index < this.savedMigrationQuestion.length; index++) {
      this.expand=true;    
    }
  }

  clicked() {
    if(this.clickedValue){
    var ins = this.savedMigrationQuestion.length;
    this.savedMigrationQuestion[ins] = this.rule;
    this.originalQuestions.splice(this.eventValue, 1);
    this.unAnswered[this.unAnswered.length]=this.savedMigrationQuestion[ins].questionId;
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
    this.savedMigrationQuestion.splice(this.eventValue, 1);
    for (let index = 0; index < this.allMigrationRules.length; index++) {
      if (this.allMigrationRules[index].questionId === this.rule.questionId) {
        this.allMigrationRules.splice(index, 1);
      }
    }
  }
  this.clickedReversedValue=false;
  }

  selectChangeHandler(optionObject, event,questionObj) {
    let flag = 0;
    if (event.target.checked) {
      for (let index = 0; index < this.allMigrationRules.length; index++) {
        if (this.allMigrationRules[index].questionId == questionObj.questionId) {
          this.allMigrationRules[index].ruleOptionTextEN = this.allMigrationRules[index].ruleOptionTextEN + "," + optionObject.optionTextEN;
          this.allMigrationRules[index].ruleOptionIds = this.allMigrationRules[index].ruleOptionIds + "," + optionObject.optionId;
          this.allMigrationRules[index].modifiedBy = this.myStorage.getCurrentUserObject().username;
          flag++;
        }
      }
      if (flag == 0) {
        let migrationRuleNewObject: DTMigrationRule = new DTMigrationRule();
        migrationRuleNewObject.questionId = questionObj.questionId;
        migrationRuleNewObject.migrationId = this.migrationIdValue;
        migrationRuleNewObject.ruleOptionTextEN = optionObject.optionTextEN;
        migrationRuleNewObject.executionOrder = 0;
        migrationRuleNewObject.questiontextEN = questionObj.questionId;
        migrationRuleNewObject.ruleOptionIds = String(optionObject.optionId);
        migrationRuleNewObject.createdBy = this.myStorage.getCurrentUserObject().username;
        this.allMigrationRules[this.allMigrationRules.length] = migrationRuleNewObject;
      }
      for (let index = 0; index < this.unAnswered.length; index++) {
                  
        if(this.unAnswered[index]===questionObj.questionId)
        {
          this.unAnswered.splice(index,1);
        }
    }
    }
    else {
      for (let index = 0; index < this.allMigrationRules.length; index++) {

        if (this.allMigrationRules[index].questionId === questionObj.questionId) {
          this.allMigrationRules[index].ruleOptionIds = this.allMigrationRules[index].ruleOptionIds.replace(optionObject.optionId+",", '');
          this.allMigrationRules[index].ruleOptionIds = this.allMigrationRules[index].ruleOptionIds.replace(","+optionObject.optionId, '');
          this.allMigrationRules[index].ruleOptionTextEN = this.allMigrationRules[index].ruleOptionTextEN.replace(optionObject.optionTextEN+",",'');
          this.allMigrationRules[index].ruleOptionTextEN = this.allMigrationRules[index].ruleOptionTextEN.replace(","+optionObject.optionTextEN,'');
          this.allMigrationRules[index].ruleOptionIds = this.allMigrationRules[index].ruleOptionIds.replace(optionObject.optionId,'');
          this.allMigrationRules[index].ruleOptionTextEN = this.allMigrationRules[index].ruleOptionTextEN.replace(optionObject.optionTextEN,'');
          if(this.allMigrationRules[index].ruleOptionIds.length<=0)
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
    for (let index = 0; index < this.allMigrationRules.length; index++) {
      if (this.allMigrationRules[index].migrationId == this.migrationIdValue) {
        if (qid == this.allMigrationRules[index].questionId) {
          if (this.allMigrationRules[index].ruleOptionIds.includes(opnObject.optionId)) {
            return true;
          }
        }
      }
    }
  }

  saveRule() {
    if(this.unAnswered.length===0){
    this.forMigrationPatternService.saveMigrationRule(this.allMigrationRules).subscribe(
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