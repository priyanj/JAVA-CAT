import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DTCloudableRule } from '../entity/DTCloudableRule';
import { DTCloudableRuleService } from '../service/dt-cloudable-rule.service';
import { LocalStorageService } from '../utility/localStorage.service';

@Component({
    selector: 'app-dt-cloudable',
    templateUrl: '../view/dt-cloudable.html'
    // styleUrls: ['./for-cloudable.component.scss']
  })
  export class DtCloudableComponent implements OnInit {
    cloudableQuestions:any = [];
    cloudableQuestionsAfterSave:any = [];
    index:number=0;
    dtCloudableQuestionsRule:any=[];
    idvalue:boolean=false;
    id:number;
    cloudableRule:any=[];
    clickedValue:boolean=false;
    eventValue:number;
    rule:DTCloudableRule= new DTCloudableRule();
    clickedReversedValue:boolean=false;

    dtOptions: DataTables.Settings = {};
    dtTrigger:  Subject<any>  =  new  Subject();
    AllData: any;
    rules: any = [];
    value:boolean= false;
    options: any = [];
    optionValues: any = [];
    questions: any = [];
    ops: string;
    
    message = '';
    user_data: any;
    executionOrders: Array<number> = [];
    cloudableRulesText: Array<String> = [];
    cloudableRules: Array<DTCloudableRule> = [];
    orderByQuestionDisplayOrder: any = [];
    count : number ;
    opns : string ;
    optionsList : string;
    optionComma:boolean=false;
    cloudableQuestionsRules: Array<DTCloudableRule> = [];
    exeorder: any = [];
    constructor(private http: HttpClient, private dtCloudableRuleService: DTCloudableRuleService, private router: Router, private myStorage: LocalStorageService) {
      this.cloudableRules = [];
    }
  
    ngOnInit() {


      
        this.dtCloudableRuleService.getAllCloudableQuestions().subscribe(result=>{
          this.dtCloudableRuleService.getCloudableRule().subscribe(result=>{this.cloudableRule=result,console.log(this.cloudableRule)});
        this.cloudableQuestions=result
        this.cloudableQuestionsAfterSave=result});
        
      }

      onClickAddrule(event:any,event1:number)
  {
    // console.log(event);
    // console.log(event1);
    // this.value=true;
    this.clickedValue=true;
    this.rule=event;
    this.eventValue=event1;
    // this.dtCloudableQuestionsRule[this.index]=event;
    // // console.log(this.dtCloudableQuestionsRule);
    // this.cloudableQuestions.splice(event1,1);
    // this.index++;

  }

  onClickRule(event2:any,event:any,event1:number)
  {
    this.clickedReversedValue=true;
    this.rule=event2;
    this.eventValue=event1;

    this.idvalue = true;
    this.id=event;

    // console.log("event");
    // console.log(event);
  }

      //   this.dtOptions  =  {
    //     pagingType:  'full_numbers',
    //     pageLength:  10,
    //     responsive:  true,
    //     rowCallback: (row: Node, data: any[] | Object, index: number) => {
    //       const self = this;
    //       $('td', row).unbind('click');
    //       $('td', row).bind('click', () => {
    //         self.someClickHandler(data);
    //       });
    //       return row;
    //     }
    //   };
    //   this.forCloudableService.collectRule(this.myStorage.getCurrentUserObject().clientId).subscribe(result => {
    //     this.rules = result;
    //   });
  
    //   this.forCloudableService.collectQuestion(this.myStorage.getCurrentUserObject().clientId).subscribe(result => {
    //     this.questions = result;console.log(this.questions);
    //   });
  
    //   this.forCloudableService.collectOptions().subscribe(result => {
    //     this.options = result;
    //   })
  
    
    // someClickHandler(info: any): void {
    //   this.message = info.id + ' - ' + info.firstName;
    // }
  
    // check(id:number)
    // {
    //   this.opns='';
    //  for (let index = 0; index < this.options.length; index++) {
      
    //   if(id==this.options[index].questionId)
    //   {
    //     this.opns = this.opns+this.options[index].optionText+',';
    //   }
    //  }
    //  this.optionsList = this.opns.slice(0, -1);
     
    // }
  
    // addCloudableRule() {
    //   for (let index = 0; index < this.rules.length; index++) {
    //     var cRule: CloudableRule = new CloudableRule();
    //     cRule.questionId = this.rules[index].questionId;
    //     cRule.cloudableRule = this.cloudableRulesText[index];
    //     cRule.executionOrder = this.executionOrders[index];
    //     cRule.questionText = this.rules[index].questionText;
    //     cRule.cloudableRuleId = this.rules[index].cloudableRuleId;
    //     this.cloudableRules[index] = cRule;
    //     this.router.navigate(['/for-cloudable']);
    //   }
    //   this.forCloudableService.addClodableRule(this.cloudableRules).subscribe();
  
    // }
  
    // onSubmit() {
    //     let cRule = new CloudableRule();
    //   this.addCloudableRule();
    // }
  
    // Cancle() {
    //   this.router.navigate(['/decision-tree']);
    // }
  
  
  
    // selectChangeHandler(event:any)
    // {
    //   if(event.target.value=="QuestionDisplayOrder")
    //   {
    //     let small : number = 0;
    //     this.rules.sort(function(displayOrder1,displayOrder2){
    //       if(displayOrder1.questionDisplayOrder>displayOrder2.questionDisplayOrder) return 1;
    //       if(displayOrder1.questionDisplayOrder<displayOrder2.questionDisplayOrder) return -1;
    //     })
  
    //   }
    //   else if (event.target.value == "ExecutionOrder") {
    //     this.rules.sort(function (executionOrder1, executionOrder2) {
    //       if (executionOrder1.executionOrder > executionOrder2.executionOrder) {
    //         return 1;
    //       }
    //       if (executionOrder1.executionOrder < executionOrder2.executionOrder) {
    //         return -1;
    //       }
    //     });
    //   }
    // }

    selectChangeHandler(optionObject,event,qid,qtext)
    {
      let flag=0;
      // console.log()
           if(event.target.checked)
            {
              for (let index = 0; index < this.cloudableRule.length; index++) {
                if(this.cloudableRule[index].questionId==qid)
                {
                  this.cloudableRule[index].optionIds = this.cloudableRule[index].optionIds+","+optionObject.optionId;
                  this.cloudableRule[index].optionTextsEN = this.cloudableRule[index].optionTextsEN+","+optionObject.optionTextEN;
                  this.cloudableRule[index].modifiedBy = this.myStorage.getCurrentUserObject().username;
                  flag++;
                }
              }
              // if(flag==0){
               
              //   for (let index = 0; index < this.cloudableRule.length; index++) {
                  
              //     // if(this.cloudableRule[index].migrationId==this.migrationIdValue)
              //     // {
              //     if(this.cloudableRule[index].questionId==qid)
              //     {
                    
              //       if(this.cloudableRule[index].optionIds==0)
              //       {
              //         let cloudableRuleNewObject:DTCloudableRule = new DTCloudableRule();
              //         cloudableRuleNewObject.questionId = qid;
              //         // cloudableRuleNewObject.migrationId = this.migrationIdValue;
              //         cloudableRuleNewObject.optionTextsEN = optionObject.optionTextEN;
              //         cloudableRuleNewObject.executionOrder =0;
              //         cloudableRuleNewObject.questionTextEN = qtext;
              //         cloudableRuleNewObject.optionIds = optionObject.optionId;
              //         cloudableRuleNewObject.cloudableRuleId=this.cloudableRule[index].migrationRuleId;
              //         flag = 1;
              //       this.cloudableRule[index]=cloudableRuleNewObject;
              //       }
                   
              //     }
              //     //  }
              //   }
                if(flag==0){
                  // console.log(this.allMigrationRules.length);
                let cloudableRuleNewObject:DTCloudableRule = new DTCloudableRule();
                cloudableRuleNewObject.questionId = qid;
                // cloudableRuleNewObject.migrationId = this.migrationIdValue;
                cloudableRuleNewObject.optionTextsEN = optionObject.optionTextEN;
                cloudableRuleNewObject.executionOrder =0;
                cloudableRuleNewObject.questionTextEN = qtext;
                cloudableRuleNewObject.optionIds = optionObject.optionId;
                cloudableRuleNewObject.createdBy = this.myStorage.getCurrentUserObject().username;
                // migrationRuleNewObject.migrationRuleId = 
                
                this.cloudableRule[this.cloudableRule.length]=cloudableRuleNewObject;
               // this.RuleId++;
              }
            // }
            }
            else{
              
              for (let index = 0; index < this.cloudableRule.length; index++) 
              {
                // console.log("Unchecked");
                // console.log("*****"+this.cloudableRule[index].questionId+"&&&&&&&&&"+optionObject.qid);
                if(this.cloudableRule[index].questionId===qid){
                  // console.log("Unchecked**********************");
                  // console.log("**********");
                  // this.cloudableRule.splice(index,1);
                  this.cloudableRule[index].optionIds =  this.cloudableRule[index].optionIds.replace(optionObject.optionId+",",'');
                  this.cloudableRule[index].optionIds =  this.cloudableRule[index].optionIds.replace(","+optionObject.optionId,'');
                  this.cloudableRule[index].optionTextsEN =  this.cloudableRule[index].optionTextsEN.replace(optionObject.optionTextEN+",",'');
                  this.cloudableRule[index].optionTextsEN =  this.cloudableRule[index].optionTextsEN.replace(","+optionObject.optionTextEN,'');
                  this.cloudableRule[index].optionIds =  this.cloudableRule[index].optionIds.replace(optionObject.optionId,'');
                  this.cloudableRule[index].optionTextsEN =  this.cloudableRule[index].optionTextsEN.replace(optionObject.optionTextEN,'');
                }
              }
            }
            // console.log(this.cloudableRule);
           
    }

    submit()
    {
      // console.log(this.cloudableRule);
      this.dtCloudableRuleService.saveCloudableRule(this.cloudableRule).subscribe();
    }

    RuleChecked(opnObject,qid)
    {
      // console.log("&&&&&&&&&");
      for (let index = 0; index < this.cloudableRule.length; index++) {
        // console.log(this.allMigrationRules[index].questionId);
        // console.log(opnObject.questionId+"   "+ this.allMigrationRules[index].questionId);
        // if(this.cloudableRule[index].migrationId==this.migrationIdValue)
        // {
       if(qid==this.cloudableRule[index].questionId)
       {
        //  console.log("********");
        if(this.cloudableRule[index].optionIds)
        {
         if(this.cloudableRule[index].optionIds.includes(opnObject.optionId))
         {
          //  Console.log("&&&&&&&&&&&&");
              // console.log(true);
           return true;
          // this.checked=true;
         }
        }
       }
      // }
      //  else{
        
      //   console.log(true);
      //    return false;
      //  }
        
      }
    }

    clicked(){
      // if(this.clickedValue)
      // {
        this.value=true;
        // this.idvalue = true;


        var ins = this.dtCloudableQuestionsRule.length;
        console.log("ins"+ins);
        this.dtCloudableQuestionsRule[ins]=this.rule;
        console.log(this.dtCloudableQuestionsRule);
        this.cloudableQuestions.splice(this.eventValue,1);
        console.log("**********")


        // var ins = this.cloudableRule.length;
        // console.log("ins"+ins);
        // this.cloudableRule[ins]=this.rule;
        // console.log(this.cloudableRule);
        // this.cloudableQuestions.splice(this.eventValue,1);
        // console.log("**********")

        // console.log(this.index);
        // this.index++;
        
      // }
    }

    reverceClicked()
    {
      var x = this.cloudableQuestions.length;
      this.cloudableQuestions[x]=this.rule;   
      console.log("&&&&&&&&&");
      console.log(this.cloudableQuestions);
      console.log(this.eventValue+"************");
      this.dtCloudableQuestionsRule.splice(this.eventValue,1);
      console.log(this.rule.questionTextEN);
      for (let index = 0; index < this.cloudableRule.length; index++) {
        if(this.cloudableRule[index].questionTextEN==this.rule.questionTextEN)
        {
          this.cloudableRule.splice(index,1);
        }
        
      }
      console.log(this.cloudableRule);

      // this.cloudableRule.remove(this.rule.questionTextEN);
     
      // console.log(this.dtCloudableQuestionsRule);

      // var x = this.cloudableQuestions.length;
      // this.cloudableQuestions[x]=this.rule;   
      // console.log("&&&&&&&&&");
      // console.log(this.cloudableQuestions);
      // console.log(this.eventValue+"************");
      
      // this.cloudableRule.splice(this.eventValue,1);
      // console.log(this.cloudableRule);


      // this.cloudableQuestions.splice(this.eventValue,1);
      // x++;
    }


  }
  
  

