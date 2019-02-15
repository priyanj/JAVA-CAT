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
  migrationRuleObject: Array<DTMigrationRule> = [];
  allMigrationRules: any=[];
  dtOptions: DataTables.Settings = {};
  countOption: number = 0;
  dtTrigger: Subject<any> = new Subject();
  migrationAllData: any = [];
  migrationOption: any = [];
  migrationRule: Array<string> = [];
  originalQuestions: any = [];
  rulesQuestion :   any = [];
  migrationQuestionLength: number;
  index:number=0;
  executionOrderValue: Array<number> = [];
  value:boolean= false;
  idvalue:boolean=false;
  id:number;
  RuleId = 0;
  checked:boolean=false;
  clientIdValue:number;
  constructor(private forMigrationPatternService: DTMigrationRuleService, public router: Router, private http: HttpClient,private myStorage:LocalStorageService) { }
  migrationIdValue: any;

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true
    };
    //this.forMigrationPatternService.question.subscribe(data => { this.migrationIdValue = data; });
    this.forMigrationPatternService.getMigrationQuestions().subscribe(result => {
      this.dtTrigger.next();
      this.migrationAllData = result ;
      console.log(result);
      // console.log(this.migrationAllData);
      // console.log( typeof(result[0]));

      // this.rulesQuestion = 
      //set with the question on which rule is set
      //:Observable<IQuestions[]>
      this.originalQuestions = result ;
      this.migrationQuestionLength = this.migrationAllData.length;
    });
    //---------this.forMigrationPatternService.getAllmigrationRules().subscribe(data=>{this.allMigrationRules=data});
  }

  // migrationProviderMethod() {
    
  //   for (let index = 0; index < this.migrationAllData.length; index++) {
  //     var migrationRuleNewObject: MigrationRule = new MigrationRule();
  //     migrationRuleNewObject.questionId = this.migrationAllData[index].questionId;
  //     migrationRuleNewObject.migrationId = this.migrationIdValue;
  //     migrationRuleNewObject.migrationRule = this.migrationRule[index];
  //     migrationRuleNewObject.executionOrder = this.executionOrderValue[index];
  //     migrationRuleNewObject.questionText = this.migrationAllData[index].questionText;
  //     for (let i = 0; i < this.migrationAllData[index].migrationRule.length; i++) {
  //       if (this.migrationAllData[index].migrationRule[i].migrationId === this.migrationIdValue) {
  //         migrationRuleNewObject.migrationRuleId = this.migrationAllData[index].migrationRule[i].migrationRuleId;
  //       }
  //     }
  //     this.migrationRuleObject[index] = migrationRuleNewObject;

  //   }
  //   this.forMigrationPatternService.updateMigrationRule(this.migrationRuleObject).subscribe();
  //   this.router.navigate(['/for-migration-pattern']);

  // }

  Cancel() {
    this.router.navigate(['/for-migration-pattern']);
  }

  addQuestions() {
    this.router.navigate(['/assessment-questions/add-assessment-question']);
  }

  onclickAdd()
  {
    // console.log("Hello");
  }
  setClickedRow(event:any)
  {
    // console.log(event);
    // console.log(event);
    
    this.originalQuestions.splice(event,1);
    
   
    // console.log(this.originalQuestions);
  }
  onClickAddrule(event:any,event1:number)
  {
    // console.log(event);
    this.value=true;

  //   for (let index1 = 0; index1 < this.originalQuestions.length; index1++) {
  //    if(event==this.originalQuestions[index1].questionId)
  //    {
  //      console.log("*****",this.originalQuestions[index1].questionId);
  //     this.rulesQuestion[this.index]=this.originalQuestions[index1];
    
  //   this.originalQuestions.splice(event,1);
  //   this.index++;
   
  //   console.log(this.rulesQuestion);
  // }
  //   }
    this.rulesQuestion[this.index]=event;
    
    this.originalQuestions.splice(event1,1);
    this.index++;
   
    // console.log(this.rulesQuestion);
    
  }
  onClickRule(event:any)
  {
    this.idvalue = true;
    this.id=event;
    // console.log("event");
    // console.log(event);
  }

  selectChangeHandler(optionObject,event,qid,qtext)
  {
    let flag=0;
    // console.log()
         if(event.target.checked)
          {
            // for (let index = 0; index < this.allMigrationRules.length; index++) {
            //   if(this.allMigrationRules[index].questionId==qid)
            //   {
            //     this.allMigrationRules[index].migrationRule = this.allMigrationRules[index].migrationRule+","+optionObject.optionText;
            //    flag++;
            //   }
            // }
            // if(flag==0){
             
              for (let index = 0; index < this.allMigrationRules.length; index++) {
                
                if(this.allMigrationRules[index].migrationId==this.migrationIdValue)
                {
                if(this.allMigrationRules[index].questionId==qid)
                {
                  
                  if(this.allMigrationRules[index].optionId==0)
                  {
                    let migrationRuleNewObject:DTMigrationRule = new DTMigrationRule();
                    migrationRuleNewObject.questionId = qid;
                    migrationRuleNewObject.migrationId = this.migrationIdValue;
                    migrationRuleNewObject.ruleOptionTextEN = optionObject.optionText;
                    migrationRuleNewObject.executionOrder =0;
                    migrationRuleNewObject.questiontextEN = qtext;
                    migrationRuleNewObject.ruleOptionIds = optionObject.optionId;
                    migrationRuleNewObject.migrationRuleId=this.allMigrationRules[index].migrationRuleId;
                    flag = 1;
                  this.allMigrationRules[index]=migrationRuleNewObject;
                  }
                 
                }
                 }
              }
              if(flag==0){
                // console.log(this.allMigrationRules.length);
              let migrationRuleNewObject:DTMigrationRule = new DTMigrationRule();
              migrationRuleNewObject.questionId = qid;
              migrationRuleNewObject.migrationId = this.migrationIdValue;
              migrationRuleNewObject.ruleOptionTextEN = optionObject.optionText;
              migrationRuleNewObject.executionOrder =0;
              migrationRuleNewObject.questiontextEN = qtext;
              migrationRuleNewObject.ruleOptionIds = optionObject.optionId
              // migrationRuleNewObject.migrationRuleId = 
              
              this.allMigrationRules[this.allMigrationRules.length]=migrationRuleNewObject;
             // this.RuleId++;
            }
          }
          // }
          else{
            for (let index = 0; index < this.allMigrationRules.length; index++) 
            {
              
              if(this.allMigrationRules[index].optionId===optionObject.optionId){
                console.log("**********");
                this.allMigrationRules.splice(index,1);
                // this.allMigrationRules[x].migrationRule =  this.allMigrationRules[x].migrationRule.replace(optionObject.optionText,'');
              }
            }
          }
         
  }
  // migrationProviderMethod(){
  //    console.log(this.allMigrationRules);
  //   this.forMigrationPatternService.updateMigrationRule(this.allMigrationRules).subscribe();
  // }

  RuleChecked(opnObject)
  {
    // console.log("&&&&&&&&&");
    for (let index = 0; index < this.allMigrationRules.length; index++) {
      // console.log(this.allMigrationRules[index].questionId);
      // console.log(opnObject.questionId+"   "+ this.allMigrationRules[index].questionId);
      if(this.allMigrationRules[index].migrationId==this.migrationIdValue)
      {
     if(opnObject.questionId==this.allMigrationRules[index].questionId)
     {
      //  console.log("********");
       if(opnObject.optionId==this.allMigrationRules[index].optionId)
       {
        //  Console.log("&&&&&&&&&&&&");
            // console.log(true);
         return true;
        // this.checked=true;
       }
     }
    }
    //  else{
      
    //   console.log(true);
    //    return false;
    //  }
      
    }
  }

}