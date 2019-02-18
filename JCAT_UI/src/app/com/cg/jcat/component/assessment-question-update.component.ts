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
    Options : Array<number>=[10];
    optionsValues = [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
    questionTypeEnum : any;
    submitted = false;
     public question :any;
    constructor(private questionService:AssessmentQuestionsService,public router: Router,private http: HttpClient,private myStorage:LocalStorageService) { }
    ngOnInit() {
        this.questionService.getQuestionType().subscribe(result=>{this.questionTypeEnum=result,console.log(this.questionTypeEnum)});
       // this.questionService.getQuestionById(this.questionId).subscribe(result=>{this.question = result});
     
       this.questionService.question.subscribe(data => {this.question= data;}); 
   // this.question=this.que;
    console.log(this.question);
    this.numberOfOptions=0;
    let option =this.optionsValues;
   
    this.numberOfOptions=this.question.questionOption.length;
    for (let index = 0; index < this.numberOfOptions; index++) {
      this.optionTextl2[index]=this.question.questionOption[index].optionText;
    }
    this.selectChangeHandler(this.numberOfOptions); 
   }

      selectChangeHandler(value:number){
        this.numberOfOptions=value;
        for (let index = 1; index <= this.numberOfOptions ; index++) {
           this.Options[index] = index;
        }
      }
      
      options(){
        for (let index = 0; index < this.question.numberOfOptions ; index++) {
          this.Options[index] = index; 
        }
      }
    
      save() {
        for (let index = 0; index < this.optionText.length; index++) {
          var option : QuestionOption = new QuestionOption();
          option.optionTextEN=this.optionText[index];
          option.optionTextLang2=this.optionTextl2[index];
          this.question.questionOptionModel[index]=option;
        
       }
       this.question.createdBy=this.myStorage.getCurrentUserObject().username;
       this.question.modifiedBy=this.myStorage.getCurrentUserObject().username;
       console.log(this.question);
       this.questionService.saveQuestions(this.question).subscribe();
       location.reload();
       this.router.navigate(['/assessment-questions']);
    }
 
   onSubmit() {   
     console.log(this.question);
     this.submitted = true
     this.save();
   }
  }