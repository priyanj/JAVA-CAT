import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentQuestionsService } from '../service/assessment-questions.service';
import { LocalStorageService } from '../utility/localStorage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionOption } from '../entity/QuestionOption';
import { AssessmentQuestions } from '../entity/AssessmentQuestion';
@Component({
    selector: 'app-assessment-question-update',
    templateUrl: '../view/assessment-question-update.component.html',
    styleUrls: ['../view/add-assessment-question.component.scss']
  })
  export class AssessmentQuestionUpdateComponent implements OnInit {
   questionId : number;
    numberOfOptions : number;
    optionText : Array<string>=[];
    optionTextl2 : Array<string>=[];
    optionId : Array<number>=[];
    prevNumberOfOptions : number;
    
    Options : Array<number>=[21];
    optionsValues = [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
    questionTypeEnum : any;
    submitted = false;
     public question :any;
    constructor(private questionService:AssessmentQuestionsService,public router: Router,private http: HttpClient,private myStorage:LocalStorageService) { }
    ngOnInit() {
        this.questionService.getQuestionType().subscribe(result=>{this.questionTypeEnum=result,console.log(this.questionTypeEnum)});
       // this.questionService.getQuestionById(this.questionId).subscribe(result=>{this.question = result});
     
       this.question =this.myStorage.getCurrentEditQuestionObject();
       console.log(this.myStorage.getCurrentEditQuestionObject());
       console.log(this.question);
      //  this.questionService.question.subscribe(data => {this.question= data;}); 
   // this.question=this.que;
    console.log("*****************"+JSON.stringify(this.question));
    this.numberOfOptions=0;
    let option =this.optionsValues;
   
    this.numberOfOptions=this.question.questionOption.length;
    this.prevNumberOfOptions=this.numberOfOptions;
    for (let index = 0; index < this.numberOfOptions; index++) {
      this.optionId[index]=this.question.questionOption[index].optionId;
      //this.optionIdl2[index]=this.question.questionOption[index]
      this.optionText[index]=this.question.questionOption[index].optionTextEN;
      this.optionTextl2[index]=this.question.questionOption[index].optionTextLang2;
    }
    // console.log("***************2222222222222"+this.optionText);
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+this.optionTextl2);
    this.selectChangeHandlerDefault(this.numberOfOptions); 

   
   }
   removeLanguage(i: number) {
    //const control = <FormArray>this.myForm.controls['languages'];
   // control.removeAt(i);
    }

    deleteTextField(event:number){
      console.log(this.numberOfOptions);
      console.log(this.question);
      this.numberOfOptions=this.numberOfOptions-1;
      this.question.numberOfOptions=this.numberOfOptions;
      console.log(this.question);
      console.log(this.numberOfOptions+"*****");
      // console.log("&&&"+this.question);
      // console.log(event);
      this.selectChangeHandlerDefault(this.numberOfOptions);
      // console.log(this.optionText[event-1]);
      this.optionText.splice(event,1);
      this.optionTextl2.splice(event,1);
      console.log(this.optionText);

    }

   selectChangeHandlerDefault(value:number){
    this.numberOfOptions=value;
    this.Options.length=this.numberOfOptions;
    for (let index = 1; index <= this.numberOfOptions ; index++) {
      // console.log(index);
      // console.log(this.Options[index]);
       this.Options[index] = index;
    }
    console.log(this.Options.length+"&&&&&&&&&&");
  }
      selectChangeHandler(event:any){
        this.numberOfOptions=parseInt(event.target.value,10);
        
        for (let index = 1; index <= this.numberOfOptions ; index++) {
           this.Options[index] = index;
        }
        // console.log("***************2222222222222"+this.optionText);
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+this.optionTextl2);
      }

      options(){
        for (let index = 0; index < this.question.numberOfOptions ; index++) {
          this.Options[index] = index; 
        }
      }
    
      save() {
        for (let index = 0; index < this.question.numberOfOptions; index++) {
          var option : QuestionOption = new QuestionOption();
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"+this.optionText[index])
          option.optionId=this.optionId[index];
         
          option.optionTextEN=this.optionText[index];
          option.optionTextLang2=this.optionTextl2[index];
          this.question.questionOption[index]=option;
        
        
       }

       console.log(this.question);

       this.question.questionOptionModel=this.question.questionOption;
       console.log(this.question.questionOptionModel);
       this.question.createdBy=this.myStorage.getCurrentUserObject().username;
       this.question.modifiedBy=this.myStorage.getCurrentUserObject().username;
       console.log(this.question);
       this.questionService.updateQuestion(this.question).subscribe();

       location.reload();
       this.router.navigate(['/assessment-questions']);
    }
 
   onSubmit() {   
     console.log("&&&&&&&&&&&&&&&&&&7")
     console.log(this.question);
     this.submitted = true
     this.save();
   }
  }