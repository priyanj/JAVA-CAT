import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';    
import { Subject } from 'rxjs';
import { AssessmentQuestions } from '../entity/AssessmentQuestion';
import { LocalStorageService } from '../utility/localStorage.service';
import { AssessmentQuestionsService } from '../service/assessment-questions.service';

class DataTablesResponse {
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
  }

  @Component({
    selector: 'app-assessment-questions',
    templateUrl: '../view/assessment-question.component.html'
  })
  export class AssessmentQuestionsComponent implements OnInit {
      
    question: AssessmentQuestions = new AssessmentQuestions();
    questionId : number;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    assessmentQuestions:Array<AssessmentQuestions>=[]
    assessmentQuestionData: any = [];
    constructor(private assessmentQuestionsService :AssessmentQuestionsService,public router: Router,private http: HttpClient, private myStorage:LocalStorageService) { 
  
    }
  
    ngOnInit() {
  
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        responsive: true};
  
      this.assessmentQuestionsService.getAllQuestions().subscribe(result => 
        {
          this.assessmentQuestionData= result ;     
          this.dtTrigger.next();
        }); 
  
    }
  
    importQuestions() {
         this.router.navigate(['/assessment-questions/import-question']);
         }
  
    addAssessmentQuestions() {
          this.router.navigate(['/assessment-questions/add-assessment-question']);
          }
    
     updateQuestions(formvalues){

      this.assessmentQuestionsService.sendMsgtoOtherComponent(formvalues);
        this.router.navigate(['/assessment-questions/assessment-question-update']);
     }      
    deleteQuestions(formvalues) {
      this.assessmentQuestionsService.deleteQuestion(formvalues)
      .subscribe(
        data => {
        },
        error => console.log('ERROR: ' + error));
       
    }
  
    deactivate(){
      this.router.navigate(['/assessment-questions/update-question']);
    }
      
    }
  