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
          
            // console.log(this.cloudableQuestions);
            // console.log(this.cloudableRule);
             for (let index = 0; index < this.cloudableQuestions.length; index++) {
              let length=1;
           for (let index1 = 0; index1 < this.cloudableRule.length; index1++) {
             
            //  console.log(this.cloudableQuestions[index].questionId+"==="+this.cloudableRule[index1].questionId)
            //  console.log(this.cloudableQuestions[index].questionTextEN+"=="+this.cloudableRule[index1].questionTextEN)
             if(this.cloudableQuestions[index].questionId===this.cloudableRule[index1].questionId)
             {
              
              //  console.log("saved")
              //  console.log(this.cloudableQuestions[index].questionId);
              //  console.log(this.cloudableRule[index1].questionId)
               this.questionSaved[this.i]=this.cloudableQuestions[index];
               this.i++;
               this.cloudableQuestions.splice(index,1);
              //  this.present=false;
              // console.log(length+"==-----")
              // console.log(this.cloudableRule.length)
              // break;
             }
            //  else if(length==this.cloudableRule.length)
            //  {
            //    console.log("uuuuuu")
            //   this.unsavedQuestionRules[this.j]=this.cloudableQuestions[index];
            //   this.j++;
            //   console.log(this.unsavedQuestionRules);

            // }
            // length++;

           }
          //  if(this.present)
          //  {
          //    this.unsavedQuestionRules[this.j]=this.cloudableQuestions[index];
          //    this.j++;
          //  }
          //  console.log(this.unsavedQuestionRules);
         }
         for (let index = 0; index < this.cloudableQuestions.length; index++) {

          for (let index1 = 0; index1 < this.cloudableRule.length; index1++) {
            if(this.cloudableQuestions[index].questionId!=this.cloudableRule[index1].questionId)
             {
              this.unsavedQuestionRules[this.j]=this.cloudableQuestions[index];
              this.j++;
              // break;
             }

          }
          // console.log(this.unsavedQuestionRules);
        }
        //  console.log(this.unsavedQuestionRules);
          });
          
        //  for (let index = 0; index < this.cloudableQuestions.length; index++) {

        //    for (let index1 = 0; index1 < this.cloudableRule.length; index1++) {
        //      if(this.cloudableQuestions[index].questionId===this.cloudableRule[index1].questionId)
        //      {
        //        this.CloudableQuestionsRule[this.i]=this.cloudableQuestions[index];
        //        this.i++;
        //      }
        //    }
        //   //  console.log(this.CloudableQuestionsRule);
        //  }
        //  console.log(this.CloudableQuestionsRule);
        });
        

        // this.getUnSavedCloudableQuestions();
        
    }
    getUnSavedCloudableQuestions(event:number)
    {
      // for (let index = 0; index < this.cloudableQuestions.length; index++) {
      // if(event===this.cloudableQuestions[index].questionId)
      // {
      //   this.CloudableQuestionsRule[index]=this.cloudableQuestions[index];
      // }
        
      // }
      for (let index1 = 0; index1 < this.cloudableRule.length; index1++) {
        if(event===this.cloudableRule[index1].questionId)
      {
        // console.log("true"+this.cloudableRule[index1].questionId);
        return false;
      } 
      else{
        return true;
      } 
    }
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
                cloudableRuleNewObject.optionIds = String(optionObject.optionId);
                cloudableRuleNewObject.createdBy = this.myStorage.getCurrentUserObject().username;
                // migrationRuleNewObject.migrationRuleId = 
                
                this.cloudableRule[this.cloudableRule.length]=cloudableRuleNewObject;
               // this.RuleId++;
              }
              
              // if(this.flag2==1)
              // {
                for (let index = 0; index < this.unAnswered.length; index++) {
                  
                  if(this.unAnswered[index]===qid)
                  {
                    this.unAnswered.splice(index,1);
                  }
                // }
                console.log("^^^^^^"+this.unAnswered);
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
                  console.log("Test 1ui"+this.cloudableRule[index].optionIds.length);
                  if(this.cloudableRule[index].optionIds.length<=0)
                  {
                    console.log("Test2io"+this.cloudableRule[index].optionIds.length);
                    this.flag2=1;
                  }
                }
                
              }
              if(this.flag2===1)
              {
              this.unAnswered[this.unAnswered.length]=qid;
              console.log("$$$$"+this.unAnswered);
              this.flag2=0;
            }
            }
            // console.log(this.cloudableRule);
           
    }

    expandall(){
      for (let index = 0; index < this.cloudableRule.length; index++) {
        this.expand=true;
        
      }
    }

    checkValid(qid)
    {
      var i=0;
      // for (let index = 0; index < this.questionSaved.length; index++) {
        for (let index1 = 0; index1 < this.unAnswered.length; index1++) {
          // while(index!==(this.questionSaved.length-1)){
        if(this.unAnswered[index1]===qid)
          {
            // this.unAnswered[i]=this.questionSaved[index].questionId;
            // i++;
           
            return qid;
          }
        // }
      // }
        
      }
    }
    submit()
    {
      // console.log(this.cloudableRule);
      if(this.unAnswered.length===0){
      // if(this.cloudableRule.length===this.questionSaved.length){
        // console.log(this.cloudableRule.length);
      // this.dtCloudableRuleService.saveCloudableRule(this.cloudableRule).subscribe();
    }else{
      // console.log("true");
      // this.fst=true;
      // // this.fst=true;
      alert("Some questions are unanswered");
    }
    }

    RuleChecked(opnObject,qid)
    {
      // console.log("&&&&&&&&&");
      console.log(this.cloudableRule);
      for (let index = 0; index < this.cloudableRule.length; index++) {
        // console.log(this.allMigrationRules[index].questionId);
        // console.log(opnObject.questionId+"   "+ this.allMigrationRules[index].questionId);
        // if(this.cloudableRule[index].migrationId==this.migrationIdValue)
        // {
       if(qid===this.cloudableRule[index].questionId)
       {
        // console.log(qid+"&&&&&&&&&");
        // console.log(this.cloudableRule[index].questionId);
        //  console.log("********");
        // if(this.cloudableRule[index].optionIds!="")
        // {
          // console.log("^^"+this.cloudableRule[index].optionIds);
          // console.log("%%"+opnObject.optionId);
         if(this.cloudableRule[index].optionIds.includes(opnObject.optionId))
         {
          //  Console.log("&&&&&&&&&&&&");
              // console.log(true);
           return true;
          // this.checked=true;
         }
        // }
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
        // this.value=true;
        // this.idvalue = true;


        // var ins = this.dtCloudableQuestionsRule.length;
        // this.dtCloudableQuestionsRule[ins]=this.rule;
        // this.cloudableQuestions.splice(this.eventValue,1);



        this.fst=false;
        if(this.clickedValue){
        var ins = this.questionSaved.length;
        this.questionSaved[ins]=this.rule;
        //  this.r = this.unAnswered.length;
        this.unAnswered[this.unAnswered.length]=this.questionSaved[ins].questionId;
        
        console.log("************"+this.unAnswered[this.unAnswered.length-1]);
        this.cloudableQuestions.splice(this.eventValue,1);

      }






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
      // var x = this.cloudableQuestions.length;
      // this.cloudableQuestions[x]=this.rule;   
      // this.dtCloudableQuestionsRule.splice(this.eventValue,1);

      // for (let index = 0; index < this.cloudableRule.length; index++) {
      //   if(this.cloudableRule[index].questionTextEN==this.rule.questionTextEN)
      //   {
      //     this.cloudableRule.splice(index,1);
      //   }
        
      // }


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

    // cloudableRulePresent(qid:number)
    // {
    //   this.cloudablechecked=false;
    //   for (let index = 0; index < this.cloudableRule.length; index++) {
    //         if(this.cloudableRule[index].questionId===qid)
    //         {
    //           // console.log(this.cloudableRule[index].questionId +"*******"+qid);
              
    //           // this.cloudableRule.splice(index,1);
    //           this.cloudablechecked=true;
    //           // console.log(this.cloudablechecked);
    //         }
    //       }
    
    //   return this.cloudablechecked;
    // }

    removeCloudableRule(qid:number,event:any){

      // console.log(event);
         if(!event.target.checked)
      {
        // console.log("unchecked");
      for (let index = 0; index < this.cloudableRule.length; index++) {
        if(this.cloudableRule[index].questionId===qid)
        {
          // console.log(this.cloudableRule[index].questionId+"***"+qid);
          this.cloudableRule.splice(index,1);
        }
        
      }
    }
      // console.log(this.cloudableRule);
    }

  }
  
  

