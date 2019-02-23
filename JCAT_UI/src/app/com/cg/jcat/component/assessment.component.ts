import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Answer } from '../entity/Answer';
import { AssessmentService } from '../service/assessment.service';
import { ApplicationService } from '../service/application.service';
import { LocalStorageService } from '../utility/localStorage.service';
import { UserService } from '../service/user.service';
import { DTCloudableRuleService } from '../service/dt-cloudable-rule.service';
import { Jsonp } from '../../../../../../node_modules/@angular/http';
import { AssessmentQuestions } from '../entity/AssessmentQuestion';
import { AssessmentQuestionsService } from '../service/assessment-questions.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-assesst-application',
  templateUrl: '../view/assessment.component.html',
  //   styleUrls: ['./assesst-application.component.scss']
})
export class AssesstApplicationComponent implements OnInit {
  application: any;
  assessmentStage: number;
  appId: number;
  questionType: string = "a";
  userActive: string;
  notSaved: boolean = true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  AllData : any;
  userData: any;
  AssessmentPage: any;
  AllCloudableQuestions: any;
  AllPatternAndProviders: any;
  assessmentQuestions: object[];
  numberOfOption: Array<string> = [];
  theCheckboxOptions: Array<string> = [];
  theCheckbox: Array<string> = [];
  public tempp: Array<string> = [];
  answers: Array<Answer> = [];
  multi = 0;
  single = 0;
  singlee = 0;
  result: any;
  queId1 = 0;
  qid = 0;
  opId = 0;
  submitEnabled: boolean;


  i = -1;
  All: any = [1, 2, 3, 4, 5, 6, 7];
  isChecked = false;

  // application: any;
  AnswersData: any = [];
  clientIdValue: number;
  userType1: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  name: string;
  constructor(private translate: TranslateService, private router: Router, private cloudableService: DTCloudableRuleService, private assessmentQuestionService: AssessmentQuestionsService, private assessmentService: AssessmentService, private applicationService: ApplicationService, private myStorage: LocalStorageService, private userService: UserService) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      columnDefs: [{ orderable: false, targets: 3 }]
    };

    this.submitEnabled = false;



    // To get application id from application list page
    this.applicationService.applicationData.subscribe(data => {
      //this.application = data;
      if (data != "default") {
        this.myStorage.setCurrentApplicationObject(data);
      }

      this.assessmentStage = this.myStorage.getCurrentApplicationObject().assessmentStage;
      this.appId = this.myStorage.getCurrentApplicationObject().aid;
      if (!this.myStorage.getCurrentUserObject().isAdmin && (this.myStorage.getCurrentUserObject().userId == this.myStorage.getCurrentApplicationObject().applicationUser)) {
        this.router.navigate(['/login']);
      }

      if (this.assessmentStage == 0) {
        //Get cloudable questions 
        this.cloudableService.getAllCloudableQuestions().subscribe(result => {
          this.AllCloudableQuestions = result;
          this.setAssessmentData(this.AllCloudableQuestions); // set cloudable questions in assessment page
        });
      }
      else {
        //Get provider and pattern questions 
        this.assessmentQuestionService.getPatternAndProviderQuestions().subscribe(result => {
          this.AllPatternAndProviders = result;
          this.setAssessmentData(this.AllPatternAndProviders); // set pattern and provider questions in assessment page
        });

      }

    });

    this.assessmentService.getAnswers(this.appId, this.assessmentStage).subscribe(result => {
      this.AnswersData = result; //get answers from database 
      this.result = this.validateAnswers(0);
    if (this.result != 1) {
      this.submitEnabled = true;
    }
    });
  }

  setAssessmentData(AssessmentPage: any) {
    this.AssessmentPage = AssessmentPage;
  }

  submit() {

    if (this.assessmentStage == 0) {

      this.assessmentService.finalized(this.AnswersData, this.appId, (this.assessmentStage + 1)).subscribe();
      this.application = this.myStorage.getCurrentApplicationObject();
      this.application.assessmentStage = (this.assessmentStage + 1);
      this.myStorage.setCurrentApplicationObject(this.application);
    }
    else if (this.assessmentStage == 1) {
      this.assessmentService.finalized(this.AnswersData, this.appId, (this.assessmentStage + 1)).subscribe();
      this.myStorage.setCurrentApplicationObject("null");
      this.router.navigate(['/application']);
    }

  }




  onSelect(obj) {
    let flag = 0;
    for (let index = 0; index < this.AssessmentPage.length; index++) {
      for (let i = 0; i < this.AssessmentPage[index]['questionOptionModel'].length; i++) {
        if (this.AssessmentPage[index]['questionOptionModel'][i].optionId == obj) {
          for (let j = 0; j < this.AnswersData.length; j++) {
            if (this.AnswersData[j].questionId == this.AssessmentPage[index].questionId) {
              this.AnswersData[j].questionTextEN = this.AssessmentPage[index].questionTextEN;
              this.AnswersData[j].optionTextsEN = this.AssessmentPage[index]['questionOptionModel'][i].optionTextEN;
              this.AnswersData[j].questionId = this.AssessmentPage[index].questionId;
              flag = 1;
              break;
            }
          }
          if (flag == 0) {
            let answer: Answer = new Answer();
            answer.applicationId = this.appId;
            answer.questionId = this.AssessmentPage[index].questionId;
            answer.questionTextEN = this.AssessmentPage[index].questionTextEN;
            answer.optionIds = obj;
            answer.optionIds = this.AssessmentPage[index]['questionOptionModel'][i].optionId;
            answer.optionTextsEN = this.AssessmentPage[index]['questionOptionModel'][i].optionTextEN;
            this.AnswersData[this.opId] = answer;
            this.opId++;
          }
        }

      }
    }
  }

  save() {

    let ansCount = this.AnswersData.length;
    for (let index = 0; index < this.AssessmentPage.length; index++) {
      let flag = 0
      for (let k = 0; k < this.AnswersData.length; k++) {
        if (this.AnswersData[k].questionId == this.AssessmentPage[index].questionId) {
          this.AnswersData[k].questionTextEN = this.AssessmentPage[index].questionTextEN;
          flag = 1;
        }
      }
    }

    this.AnswersData.sort(function (questionOrder1, questionOrder2) {
      if (questionOrder1.questionId > questionOrder2.questionId) {
        return 1;
      }
      if (questionOrder1.questionId < questionOrder2.questionId) {
        return -1;
      }
    });
    //this.assessmentService.saveAnswers(this.AnswersData, this.application.aid).subscribe();
    // if (this.myStorage.getCurrentUserObject().isAdmin) {
    //   this.router.navigate(['/application']);
    // } else {
    //   location.reload();
    //   this.router.navigate(['/user/user-role']);
    // }
  }

  saveFlag() {
    this.notSaved = false;
  }


  clickMethod(name: string) {
    const submitAlert = this.translate.instant('alertMessage');
    if (confirm(submitAlert)) {
      this.submit();
    }
    if (this.assessmentStage == 1) {
      this.router.navigate(['/application']);
    }
    location.reload();
  }

  onSubmit(formvalues) {
    let result = 0;
    this.save();
    this.assessmentService.saveAnswers(this.AnswersData, this.appId).subscribe();
    //location.reload();
    this.result = this.validateAnswers(0);
    if (this.result != 1) {
      this.submitEnabled = true;
    }
    location.reload();
  }

  validateAnswers(validateResult: any): Observable<number> {
    let count = 0;
    for (let index = 0; index < this.AssessmentPage.length; index++) {
      for (let index1 = 0; index1 < this.AnswersData.length; index1++) {

        if (this.AssessmentPage[index].questionId == this.AnswersData[index1].questionId && this.AnswersData[index1].optionIds != "option") {
          count++;
        }
      }
    }
    if (count != this.AssessmentPage.length) {
      //alert("Please select answer for all questions");
      validateResult = 1;
      return validateResult;
    }
  }

  back() {
    this.router.navigate(['/application']);
  }

  updateSelectedTimeslots(event) {
    for (let x = 0; x < this.AnswersData.length; x++) {
      if (event.target.checked) {
        if (this.AnswersData[x].optionId.indexOf(parseInt(event.target.name)) < 0) {
          this.AnswersData[x].optionId.push(parseInt(event.target.name));

        }
      } else {
        if (this.AnswersData[x].optionId.indexOf(parseInt(event.target.name)) > -1) {
          this.AnswersData[x].optionId.splice(this.AnswersData[x].optionId.indexOf(parseInt(event.target.name)), 1);
        }
      }

    }
  }
  selectChangeHandler(optionObject, event, question) {
    let flag = 0;
    if (event.target.checked) {
      for (let x = 0; x < this.AnswersData.length; x++) {
        if (this.AnswersData[x].questionId === question.questionId) {
          if (this.AnswersData[x].optionIds == "option") {
            this.AnswersData[x].optionIds = optionObject.optionId;
            this.AnswersData[x].questionTextEN = question.questionTextEN;
            this.AnswersData[x].optionTextsEN = optionObject.optionTextEN;
            flag = 1;
          }
          else {
            this.AnswersData[x].optionIds = this.AnswersData[x].optionIds + "," + optionObject.optionId;
            this.AnswersData[x].optionTextsEN = this.AnswersData[x].optionTextsEN + "," + optionObject.optionTextEN;
            flag = 1;
          }

        }
      }
      if (flag == 0) {
        let answer: Answer = new Answer();
        answer.applicationId = this.appId;
        answer.questionId = question.questionId;
        answer.optionIds = optionObject.optionId;
        answer.optionTextsEN = optionObject.optionTextEN;
        this.AnswersData[this.opId] = answer;
        this.opId++;
      }


    } else {
      for (let x = 0; x < this.AnswersData.length; x++) {
        if (this.AnswersData[x].questionId === question.questionId) {
          this.AnswersData[x].questionTextEN = question.questionTextEN;
          this.AnswersData[x].optionTextsEN = this.AnswersData[x].optionTextsEN.replace(optionObject.optionTextEN + ",", '');
          if (this.AnswersData[x].optionTextsEN == optionObject.optionTextEN) {
            this.AnswersData[x].optionTextsEN = this.AnswersData[x].optionTextsEN.replace(optionObject.optionTextEN, '');
          }
          this.AnswersData[x].optionIds = this.AnswersData[x].optionIds.replace(optionObject.optionId + ",", '');
        }
      }

    }

  }
}
