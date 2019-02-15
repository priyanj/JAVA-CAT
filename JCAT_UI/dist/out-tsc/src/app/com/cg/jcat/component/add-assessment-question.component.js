"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var AssessmentQuestion_1 = require("../entity/AssessmentQuestion");
var QuestionOption_1 = require("../entity/QuestionOption");
var assessment_questions_service_1 = require("../service/assessment-questions.service");
var localStorage_service_1 = require("../utility/localStorage.service");
var AddAssessmentQuestionComponent = /** @class */ (function () {
    function AddAssessmentQuestionComponent(questionService, router, http, myStorage) {
        this.questionService = questionService;
        this.router = router;
        this.http = http;
        this.myStorage = myStorage;
        this.optionText = [];
        this.optionTextl2 = [];
        this.Options = [10];
        this.question = new AssessmentQuestion_1.AssessmentQuestions();
        this.optionList = [];
        this.submitted = false;
        this.optionsValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
        this.MigrationData = [];
        this.CloudProviderData = [];
        this.MigrationDataArray = [];
        this.CloudProviderDataArray = [];
    }
    AddAssessmentQuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.questionService.getQuestionType().subscribe(function (result) { _this.questionTypeEnum = result, console.log(_this.questionTypeEnum); });
    };
    AddAssessmentQuestionComponent.prototype.selectChangeHandler = function (event) {
        this.numberOfOptions = parseInt(event.target.value, 10);
        for (var index = 1; index <= this.numberOfOptions; index++) {
            this.Options[index] = index;
        }
    };
    AddAssessmentQuestionComponent.prototype.options = function () {
        for (var index = 0; index < this.question.numberOfOptions; index++) {
            this.Options[index] = index;
        }
    };
    AddAssessmentQuestionComponent.prototype.newQuestion = function () {
        this.submitted = false;
        this.question = new AssessmentQuestion_1.AssessmentQuestions();
    };
    AddAssessmentQuestionComponent.prototype.save = function () {
        for (var index = 0; index < this.optionText.length; index++) {
            var option = new QuestionOption_1.QuestionOption();
            option.optionTextEN = this.optionText[index];
            option.optionTextLang2 = this.optionTextl2[index];
            this.question.questionOptionModel[index] = option;
        }
        this.question.createdBy = this.myStorage.getCurrentUserObject().username;
        this.question.modifiedBy = this.myStorage.getCurrentUserObject().username;
        console.log(this.question);
        this.questionService.saveQuestions(this.question).subscribe();
        location.reload();
        this.router.navigate(['/assessment-questions']);
    };
    AddAssessmentQuestionComponent.prototype.onSubmit = function () {
        console.log(this.question);
        this.submitted = true;
        this.save();
    };
    AddAssessmentQuestionComponent = __decorate([
        core_1.Component({
            selector: 'app-add-assessment-question',
            templateUrl: '../view/add-assessment-question.component.html',
            styleUrls: ['../view/add-assessment-question.component.scss']
        }),
        __metadata("design:paramtypes", [assessment_questions_service_1.AssessmentQuestionsService, router_1.Router, http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], AddAssessmentQuestionComponent);
    return AddAssessmentQuestionComponent;
}());
exports.AddAssessmentQuestionComponent = AddAssessmentQuestionComponent;
//# sourceMappingURL=add-assessment-question.component.js.map