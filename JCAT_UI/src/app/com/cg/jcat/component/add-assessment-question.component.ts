import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AssessmentQuestions } from '../entity/AssessmentQuestion';
import { QuestionOption } from '../entity/QuestionOption';
import { AssessmentQuestionsService } from '../service/assessment-questions.service';
import { LocalStorageService } from '../utility/localStorage.service';


@Component({
  selector: 'app-add-assessment-question',
  templateUrl: '../view/add-assessment-question.component.html',
  styleUrls: ['../view/add-assessment-question.component.scss']
})
export class AddAssessmentQuestionComponent implements OnInit {
  assessmentTypeForMigrationValue : boolean;
  assessmentTypeForCloudProvider : boolean;
  answerValues : string;
  value : string
  optionText : Array<string>=[];
  optionTextl2 : Array<string>=[];
  Options : Array<number>=[10];
 
 public question : AssessmentQuestions = new AssessmentQuestions(); 
 public optionList : Array<QuestionOption>=[];
  submitted = false;
  numberOfOptions : number;
  optionsValues = [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
  MigrationData : any = [];
  CloudProviderData : any = [];
  MigrationDataArray : any=[];
  CloudProviderDataArray : any=[];
  clientIdValue : number;
  questionTypeEnum : any;
  
  constructor(private questionService: AssessmentQuestionsService,public router: Router,private http: HttpClient,private myStorage:LocalStorageService) { }

  ngOnInit() {
    this.questionService.getQuestionType().subscribe(result=>{this.questionTypeEnum=result,console.log(this.questionTypeEnum)});
  }

  selectChangeHandler(event:any){
    this.numberOfOptions=parseInt(event.target.value,10);

    for (let index = 1; index <= this.numberOfOptions ; index++) {
       this.Options[index] = index;
    }
  }

  options(){
    for (let index = 0; index < this.question.numberOfOptions ; index++) {
      this.Options[index] = index; 
    }
  }

  newQuestion(): void {
    this.submitted = false;
    this.question = new AssessmentQuestions();
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
