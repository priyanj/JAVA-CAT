import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DTCloudableRule } from '../entity/DTCloudableRule';
import { DTCloudableRuleService } from '../service/dt-cloudable-rule.service';
import { LocalStorageService } from '../utility/localStorage.service';
import { AssessmentQuestions } from '../entity/AssessmentQuestion';


@Component({
    selector: 'app-dt-cloudable',
    templateUrl: '../view/dt-cloudable.html'
    // styleUrls: ['./for-cloudable.component.scss']
  })
  export class DtCloudableComponent implements OnInit {
    cloudableQuestions:any = [];
    index:number=0;
    i:number=0;
    j:number=0;
    present:boolean=true;
    questionSaved:any = [];
    unsavedQuestionRules:any=[];
    dtCloudableQuestionsRule:any=[];
    idvalue:boolean=false;
    id:number;
    cloudableRule:any=[];
    checkedCloudableRule:any=[];
    clickedValue:boolean=false;
    eventValue:number;
    rule:DTCloudableRule= new DTCloudableRule();
    clickedReversedValue:boolean=false;
    cloudablechecked:boolean=false;
    expand:boolean=false;
    fst:boolean=false;
    unAnswered:any=[];
    flag2:number=0;


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
      
      
        this.dtCloudableRuleService.getAllCloudableQuestions().subscribe(result=>{this.cloudableQuestions=result,
          this.dtCloudableRuleService.getCloudableRule().subscribe(result=>{this.cloudableRule=result,this.checkedCloudableRule=result
          
           
             for (let index = 0; index < this.cloudableQuestions.length; index++) {
              let length=1;
           for (let index1 = 0; index1 < this.cloudableRule.length; index1++) {
             
             if(this.cloudableQuestions[index].questionId===this.cloudableRule[index1].questionId)
             {
               this.questionSaved[this.i]=this.cloudableQuestions[index];
               this.i++;
               this.cloudableQuestions.splice(index,1);
             }
           }
         }
         for (let index = 0; index < this.cloudableQuestions.length; index++) {

          for (let index1 = 0; index1 < this.cloudableRule.length; index1++) {
            if(this.cloudableQuestions[index].questionId!=this.cloudableRule[index1].questionId)
             {
              this.unsavedQuestionRules[this.j]=this.cloudableQuestions[index];
              this.j++;
             }

          }
        }
          });
        });
    }
    getUnSavedCloudableQuestions(event:number)
    {
      for (let index1 = 0; index1 < this.cloudableRule.length; index1++) {
        if(event===this.cloudableRule[index1].questionId)
      {
        return false;
      } 
      else{
        return true;
      } 
    }
  }

      onClickAddrule(event:any,event1:number)
  {
    this.clickedValue=true;
    this.rule=event;
    this.eventValue=event1;
  }

  onClickRule(event2:any,event:any,event1:number)
  {
    this.clickedReversedValue=true;
    this.rule=event2;
    this.eventValue=event1;

    this.idvalue = true;
    this.id=event;
  }
    // Cancle() {
    //   this.router.navigate(['/decision-tree']);
    // }
    selectChangeHandler(optionObject,event,qid,qtext)
    {
      let flag=0;
           if(event.target.checked)
            {
              this.fst=false;
              for (let index = 0; index < this.cloudableRule.length; index++) {
                if(this.cloudableRule[index].questionId==qid)
                {
                  this.cloudableRule[index].optionIds = this.cloudableRule[index].optionIds+","+optionObject.optionId;
                  this.cloudableRule[index].optionTextsEN = this.cloudableRule[index].optionTextsEN+","+optionObject.optionTextEN;
                  this.cloudableRule[index].modifiedBy = this.myStorage.getCurrentUserObject().username;
                 
                  flag++;
                }
                
              }
                if(flag==0){
                let cloudableRuleNewObject:DTCloudableRule = new DTCloudableRule();
                cloudableRuleNewObject.questionId = qid;
                cloudableRuleNewObject.optionTextsEN = optionObject.optionTextEN;
                cloudableRuleNewObject.executionOrder =0;
                cloudableRuleNewObject.questionTextEN = qtext;
                cloudableRuleNewObject.optionIds = String(optionObject.optionId);
                cloudableRuleNewObject.createdBy = this.myStorage.getCurrentUserObject().username;
                
                this.cloudableRule[this.cloudableRule.length]=cloudableRuleNewObject;
              }
                for (let index = 0; index < this.unAnswered.length; index++) {
                  
                  if(this.unAnswered[index]===qid)
                  {
                    this.unAnswered.splice(index,1);
                  }
              }
            }
            else{
              
              for (let index = 0; index < this.cloudableRule.length; index++) 
              {
                if(this.cloudableRule[index].questionId===qid){
                  this.cloudableRule[index].optionIds =  this.cloudableRule[index].optionIds.replace(optionObject.optionId+",",'');
                  this.cloudableRule[index].optionIds =  this.cloudableRule[index].optionIds.replace(","+optionObject.optionId,'');
                  this.cloudableRule[index].optionTextsEN =  this.cloudableRule[index].optionTextsEN.replace(optionObject.optionTextEN+",",'');
                  this.cloudableRule[index].optionTextsEN =  this.cloudableRule[index].optionTextsEN.replace(","+optionObject.optionTextEN,'');
                  this.cloudableRule[index].optionIds =  this.cloudableRule[index].optionIds.replace(optionObject.optionId,'');
                  this.cloudableRule[index].optionTextsEN =  this.cloudableRule[index].optionTextsEN.replace(optionObject.optionTextEN,'');
                  if(this.cloudableRule[index].optionIds.length<=0)
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

    hideall(){
      for (let index = 0; index < this.questionSaved.length; index++) {
        this.expand=false;
        
      }
    }

    expandall(){
      for (let index = 0; index < this.questionSaved.length; index++) {
        this.expand=true;
        
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
    submit()
    {
      if(this.unAnswered.length===0){
      this.dtCloudableRuleService.saveCloudableRule(this.cloudableRule).subscribe();
      location.reload();
    }else{
      alert("Some questions are unanswered");
    }

    }

    RuleChecked(opnObject,qid)
    {
      console.log(this.cloudableRule);
      for (let index = 0; index < this.cloudableRule.length; index++) {
       if(qid===this.cloudableRule[index].questionId)
       {
         if(this.cloudableRule[index].optionIds.includes(opnObject.optionId))
         {
           return true;
         }
       }
      }
    }

    clicked(){
        this.fst=false;
        if(this.clickedValue){
        var ins = this.questionSaved.length;
        this.questionSaved[ins]=this.rule;
        this.unAnswered[this.unAnswered.length]=this.questionSaved[ins].questionId;
        
        this.cloudableQuestions.splice(this.eventValue,1);

      }
      this.clickedValue=false;

    }

    reverceClicked()
    {

      if(this.clickedReversedValue){
      var x = this.cloudableQuestions.length;
      this.cloudableQuestions[x]=this.rule;   
      this.questionSaved.splice(this.eventValue,1);

      for (let index = 0; index < this.cloudableRule.length; index++) {
        if(this.cloudableRule[index].questionTextEN==this.rule.questionTextEN)
        {
          this.cloudableRule.splice(index,1);
        }
        
      }
    }
    this.clickedReversedValue=false;
    }

    removeCloudableRule(qid:number,event:any){

         if(!event.target.checked)
      {
      for (let index = 0; index < this.cloudableRule.length; index++) {
        if(this.cloudableRule[index].questionId===qid)
        {
          this.cloudableRule.splice(index,1);
        }
        
      }
    }
    }

  }
  
  

