import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../../node_modules/@angular/router';
import { HttpClient } from '@angular/common/http';


import { Subject } from 'rxjs';
import { DTMigrationRuleService } from '../service/dt-migration-rule.service';
import { LocalStorageService } from '../utility/localStorage.service';
import { DTMigrationRule } from '../entity/DTMigrationRule';



@Component({
  selector: 'app-migration-patterns',
  templateUrl: '../view/dt-migration-pattern-rule.component.html',
  styleUrls: ['../view/dt-migration-pattern-rule.component.scss']
})
export class DTMigrationPatternComponentRule implements OnInit {

  clickedValue: boolean = false;
  eventValue: number;
  rule: DTMigrationRule = new DTMigrationRule();
  clickedReversedValue: boolean = false;

  migrationRuleObject: Array<DTMigrationRule> = [];
  allMigrationRules: any = [];
  dtOptions: DataTables.Settings = {};
  countOption: number = 0;
  dtTrigger: Subject<any> = new Subject();
  migrationAllData: any = [];
  migrationOption: any = [];
  migrationRule: Array<string> = [];
  originalQuestions: any = [];
  rulesQuestion: any = [];
  migrationQuestionLength: number;
  index: number = 0;
  executionOrderValue: Array<number> = [];
  value: boolean = false;
  idvalue: boolean = false;
  id: number;
  RuleId = 0;
  checked: boolean = false;
  constructor(private forMigrationPatternService: DTMigrationRuleService, public router: Router, private http: HttpClient, private myStorage: LocalStorageService) { }
  migrationIdValue: any;

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true
    };
    this.forMigrationPatternService.migrationId.subscribe(data => { this.migrationIdValue = data; });
    this.forMigrationPatternService.getMigrationQuestions().subscribe(result => {
      this.dtTrigger.next();
      this.migrationAllData = result ;
      this.originalQuestions = result ;
      this.migrationQuestionLength = this.migrationAllData.length;
    });
    this.forMigrationPatternService.getMigrationRule(this.migrationIdValue).subscribe(data => { this.allMigrationRules = data });
  }

  Cancel() {
    this.router.navigate(['/for-migration-pattern']);
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
    var ins = this.rulesQuestion.length;
    this.rulesQuestion[ins] = this.rule;
    this.originalQuestions.splice(this.eventValue, 1);
  }

  onClickRule(event2: any, event: any, event1: number) {
    this.idvalue = true;
    this.id = event;
    this.clickedReversedValue = true;
    this.rule = event2;
    this.eventValue = event1;
  }

  reverceClicked() {
    var x = this.originalQuestions.length;
    this.originalQuestions[x] = this.rule;
    this.rulesQuestion.splice(this.eventValue, 1);
    for (let index = 0; index < this.allMigrationRules.length; index++) {
      if (this.allMigrationRules[index].questionTextEN == this.rule.questiontextEN) {
        this.allMigrationRules.splice(index, 1);
      }

    }
  }

  selectChangeHandler(optionObject, event, qid, qtext) {
    let flag = 0;
    if (event.target.checked) {
      for (let index = 0; index < this.allMigrationRules.length; index++) {
        if (this.allMigrationRules[index].questionId == qid) {
          this.allMigrationRules[index].ruleOptionTextEN = this.allMigrationRules[index].ruleOptionTextEN + "," + optionObject.optionTextEN;
          this.allMigrationRules[index].ruleOptionIds = this.allMigrationRules[index].ruleOptionIds + "," + optionObject.optionId;
          flag++;
        }
      }
      if (flag == 0) {
        let migrationRuleNewObject: DTMigrationRule = new DTMigrationRule();
        migrationRuleNewObject.questionId = qid;
        migrationRuleNewObject.migrationId = this.migrationIdValue;
        migrationRuleNewObject.ruleOptionTextEN = optionObject.optionTextEN;
        migrationRuleNewObject.executionOrder = 0;
        migrationRuleNewObject.questiontextEN = qtext;
        migrationRuleNewObject.ruleOptionIds = optionObject.optionId
        this.allMigrationRules[this.allMigrationRules.length] = migrationRuleNewObject;
      }
    }
    else {
      for (let index = 0; index < this.allMigrationRules.length; index++) {

        if (this.allMigrationRules[index].questionId === qid) {
          this.allMigrationRules[index].ruleOptionTextEN = this.allMigrationRules[index].ruleOptionTextEN.replace("," + optionObject.optionTextEN, '');
          this.allMigrationRules[index].ruleOptionIds = this.allMigrationRules[index].ruleOptionIds.replace("," + optionObject.optionId + ",", '');
          this.allMigrationRules[index].ruleOptionIds = this.allMigrationRules[index].ruleOptionIds.replace("," + optionObject.optionId, '');
          this.allMigrationRules[index].ruleOptionTextEN = this.allMigrationRules[index].ruleOptionTextEN.replace(optionObject.optionTextEN, '');
          this.allMigrationRules[index].ruleOptionTextEN = this.allMigrationRules[index].ruleOptionTextEN.replace(optionObject.optionTextEN + ",", '');
          this.allMigrationRules[index].ruleOptionIds = this.allMigrationRules[index].ruleOptionIds.replace(optionObject.optionId + ",", '');
        }
      }
    }
    console.log(this.allMigrationRules)

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
    this.forMigrationPatternService.saveMigrationRule(this.allMigrationRules).subscribe(
    );
  }

}