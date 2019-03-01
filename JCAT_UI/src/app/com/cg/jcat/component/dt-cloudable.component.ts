import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DTCloudableRule } from '../entity/DTCloudableRule';
import { DTCloudableRuleService } from '../service/dt-cloudable-rule.service';
import { LocalStorageService } from '../utility/localStorage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-dt-cloudable',
    templateUrl: '../view/dt-cloudable.html'
    // styleUrls: ['./for-cloudable.component.scss']
  })
  export class DtCloudableComponent implements OnInit {
    cloudableQuestions:any = [];
    questionSaved:any = [];
    dtCloudableQuestionsRule:any=[];
    id:number;
    cloudableRule:any=[];
    checkedCloudableRule:any=[];
    clickedValue:boolean=false;
    eventValue:number;
    rule:DTCloudableRule= new DTCloudableRule();
    clickedReversedValue:boolean=false;
    cloudablechecked:boolean=false;
    expand:boolean=false;
    unAnswered:any=[];
    flag2:number=0;
    constructor(private translate: TranslateService,private dtCloudableRuleService: DTCloudableRuleService, private router: Router, private myStorage: LocalStorageService) {
    }
  
    ngOnInit() {
      
      
        this.dtCloudableRuleService.getAllCloudableQuestions().subscribe(result=>{this.cloudableQuestions=result,
          this.dtCloudableRuleService.getCloudableRule().subscribe(result=>{this.cloudableRule=result
           
            for (let index1 = 0; index1 < this.cloudableRule.length; index1++) {
             for (let index = 0; index < this.cloudableQuestions.length; index++) {
           
             if(this.cloudableRule[index1].questionId===this.cloudableQuestions[index].questionId)
             {
               this.questionSaved[this.questionSaved.length]=this.cloudableQuestions[index];
               this.cloudableQuestions.splice(index,1);
             }
           }
         }
          });
        });
    }

      onClickAddrule(questionobj:any,index:number)
  {
    this.clickedValue=true;
    this.rule=questionobj;
    this.eventValue=index;
  }

  onClickRule(questionObj:any,index:number)
  {
    this.clickedReversedValue=true;
    this.rule=questionObj;
    this.eventValue=index;

    this.id=questionObj.questionId;
  }
    Cancle() {
      this.router.navigate(['/decision-tree']);
    }
    selectChangeHandler(optionObject,event,question)
    {
      let flag=0;
           if(event.target.checked)
            {
              for (let index = 0; index < this.cloudableRule.length; index++) {
                if(this.cloudableRule[index].questionId==question.questionId)
                {
                  this.cloudableRule[index].optionIds = this.cloudableRule[index].optionIds+","+optionObject.optionId;
                  this.cloudableRule[index].optionTextsEN = this.cloudableRule[index].optionTextsEN+","+optionObject.optionTextEN;
                  this.cloudableRule[index].modifiedBy = this.myStorage.getCurrentUserObject().username;
                 
                  flag++;
                }
                
              }
                if(flag==0){
                let cloudableRuleNewObject:DTCloudableRule = new DTCloudableRule();
                cloudableRuleNewObject.questionId = question.questionId;
                cloudableRuleNewObject.optionTextsEN = optionObject.optionTextEN;
                cloudableRuleNewObject.executionOrder =0;
                cloudableRuleNewObject.questionTextEN = question.questionTextEN;
                cloudableRuleNewObject.optionIds = String(optionObject.optionId);
                cloudableRuleNewObject.createdBy = this.myStorage.getCurrentUserObject().username;
                
                this.cloudableRule[this.cloudableRule.length]=cloudableRuleNewObject;
              }
                for (let index = 0; index < this.unAnswered.length; index++) {
                  
                  if(this.unAnswered[index]===question.questionId)
                  {
                    this.unAnswered.splice(index,1);
                  }
              }
            }
            else{
              
              for (let index = 0; index < this.cloudableRule.length; index++) 
              {
                if(this.cloudableRule[index].questionId===question.questionId){
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
              this.unAnswered[this.unAnswered.length]=question.questionId;
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
      alert(this.translate.instant('Message'));
    }
    }

    RuleChecked(opnObject,qid)
    {
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
        if(this.clickedValue){
        var ins = this.questionSaved.length;
        this.questionSaved[this.questionSaved.length]=this.rule;
        this.unAnswered[this.unAnswered.length]=this.questionSaved[ins].questionId;
        
        this.cloudableQuestions.splice(this.eventValue,1);
      }
      this.clickedValue=false;

    }

    reverceClicked()
    {

      if(this.clickedReversedValue){
      this.cloudableQuestions[this.cloudableQuestions.length]=this.rule;   
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
  }
  
  

