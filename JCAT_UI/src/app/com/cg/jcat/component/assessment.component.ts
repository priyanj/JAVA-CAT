import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Answer } from '../entity/Answer';
import { AssessmentService } from '../service/assessment.service';
import { ApplicationService } from '../service/application.service';
import { LocalStorageService } from '../utility/localStorage.service';
import { UserService } from '../service/user.service';
import { DTCloudableRuleService } from '../service/dt-cloudable-rule.service';
import { AssessmentQuestionsService } from '../service/assessment-questions.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-assesst-application',
  templateUrl: '../view/assessment.component.html'
})
export class AssesstApplicationComponent implements OnInit {
  option: string = " ";
  multiSelectOption: string = "delete";
  application: any;
  assessmentStage: number;
  appId: number;
  dtOptions: DataTables.Settings = {};
  AssessmentPage: any;
  AllCloudableQuestions: any;
  AllPatternAndProviders: any;
  result: any;
  checkResultForButton: any;
  opId = 0;
  count: number = 0;
  submitEnabled: boolean;
  i = -1;
  AnswersData: any = [];
  
  constructor(private translate: TranslateService, private router: Router, private cloudableService: DTCloudableRuleService, private assessmentQuestionService: AssessmentQuestionsService, private assessmentService: AssessmentService, private applicationService: ApplicationService, private myStorage: LocalStorageService, private userService: UserService) {
  }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      columnDefs: [{ orderable: false, targets: 3 }]
    };

    this.applicationService.applicationData.subscribe(data => {
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
    });


  }

  setAssessmentData(AssessmentPage: any) {
    this.AssessmentPage = AssessmentPage;
    this.checkResultForButton = 0;

    this.checkResultForButton = this.validateAnswers(0);
    if (this.checkResultForButton != 1) {
      this.submitEnabled = true;
    }
    else {
      this.submitEnabled = false;
    }
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




  onSelect(optionIdValue) {
    for (let index = 0; index < this.AssessmentPage.length; index++) {
      for (let i = 0; i < this.AssessmentPage[index]['questionOptionModel'].length; i++) {
        if (this.AssessmentPage[index]['questionOptionModel'][i].optionId == optionIdValue) {
          for (let j = 0; j < this.AnswersData.length; j++) {
            if (this.AnswersData[j].questionId == this.AssessmentPage[index].questionId) {
              this.AnswersData[j].questionTextEN = this.AssessmentPage[index].questionTextEN;
              this.AnswersData[j].optionTextsEN = this.AssessmentPage[index]['questionOptionModel'][i].optionTextEN;
              this.AnswersData[j].questionId = this.AssessmentPage[index].questionId;
              break;
            }
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
  }


  clickMethod(name: string) {
    const submitAlert = this.translate.instant('alertMessage');
    if (confirm(submitAlert)) {
      location.reload();
      this.submit();
    }
    if (this.assessmentStage == 1) {
      this.router.navigate(['/application']);
    }
    location.reload();

  }

  onSubmit() {
    this.save();
    this.assessmentService.saveAnswers(this.AnswersData, this.appId).subscribe();
    location.reload();
  }

  validateAnswers(validateResult: any): Observable<number> {
    this.count = 0;
    for (let index = 0; index < this.AssessmentPage.length; index++) {
      for (let index1 = 0; index1 < this.AnswersData.length; index1++) {

        if (this.AssessmentPage[index].questionId == this.AnswersData[index1].questionId && this.AnswersData[index1].optionIds != this.option) {
          this.count++;
        }
      }
      if (this.AssessmentPage[index].questionId == this.AnswersData[index].questionId && this.AssessmentPage[index].questionType === "LONG_ANSWER" || this.AssessmentPage[index].questionType === "SHORT_ANSWER") {
        this.count++;
      }
    }
    if (this.count != this.AssessmentPage.length) {
      validateResult = 1;
      return validateResult;
    }
  }

  back() {
    this.router.navigate(['/application']);
  }

  selectChangeHandler(optionObject, event, question) {
    if (event.target.checked) {
      for (let x = 0; x < this.AnswersData.length; x++) {
        if (this.AnswersData[x].questionId === question.questionId) {
          if (this.AnswersData[x].optionIds == this.option) {
            this.AnswersData[x].optionIds = optionObject.optionId;
            this.AnswersData[x].questionTextEN = question.questionTextEN;
            this.AnswersData[x].optionTextsEN = optionObject.optionTextEN;
          }
          else {
            this.AnswersData[x].optionIds = this.AnswersData[x].optionIds + "," + optionObject.optionId;
            this.AnswersData[x].optionTextsEN = this.AnswersData[x].optionTextsEN + "," + optionObject.optionTextEN;
          }

        }
      }
    } else {
      for (let x = 0; x < this.AnswersData.length; x++) {
        if (this.AnswersData[x].questionId === question.questionId) {
          var lastAnswerText = this.AnswersData[x].optionTextsEN;
          var lastAnswerId = this.AnswersData[x].optionIds;

          if (lastAnswerText.search(",") == -1 && lastAnswerId.search(",") == -1) {
            this.AnswersData[x].optionTextsEN = this.AnswersData[x].optionTextsEN.replace(optionObject.optionTextEN, this.multiSelectOption);
            this.AnswersData[x].optionIds = this.AnswersData[x].optionIds.replace(optionObject.optionId, this.multiSelectOption);
          }
          else {

            var answerOptionText = this.AnswersData[x].optionTextsEN;
            var answerOptionId = this.AnswersData[x].optionIds;
            var lastIndex = answerOptionText.lastIndexOf(",");
            var lastIndex1 = answerOptionId.lastIndexOf(",");

            answerOptionText = answerOptionText.substring((lastIndex + 1), answerOptionText.length); //4.value
            answerOptionId = answerOptionId.substring((lastIndex1 + 1), answerOptionId.length); //4.value

            if (answerOptionText == optionObject.optionTextEN && answerOptionId == optionObject.optionId) {
              this.AnswersData[x].optionTextsEN = this.AnswersData[x].optionTextsEN.replace("," + optionObject.optionTextEN, '');
              this.AnswersData[x].optionIds = this.AnswersData[x].optionIds.replace("," + optionObject.optionId, '');
            }
            else {
              this.AnswersData[x].questionTextEN = question.questionTextEN;
              this.AnswersData[x].optionTextsEN = this.AnswersData[x].optionTextsEN.replace(optionObject.optionTextEN + ",", '');
              if (this.AnswersData[x].optionTextsEN == optionObject.optionTextEN) {
                this.AnswersData[x].optionTextsEN = this.AnswersData[x].optionTextsEN.replace(optionObject.optionTextEN, '');
                this.AnswersData[x].optionIds = this.AnswersData[x].optionTextsEN.replace(optionObject.optionId, '');
              }
              this.AnswersData[x].optionIds = this.AnswersData[x].optionIds.replace(optionObject.optionId + ",", '');
            }
          }

        }
      }

    }

  }
}
