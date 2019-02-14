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
var Question_1 = require("../Question");
var assessment_questions_service_1 = require("../assessment-questions.service");
var Option_1 = require("../Option");
var http_1 = require("@angular/common/http");
var MigrationRule_1 = require("../MigrationRule");
var CloudProviderRule_1 = require("../CloudProviderRule");
var localStorage_service_1 = require("../../utility/service/localStorage.service");
var AddAssessmentQuestionComponent = /** @class */ (function () {
    function AddAssessmentQuestionComponent(questionService, router, http, myStorage) {
        this.questionService = questionService;
        this.router = router;
        this.http = http;
        this.myStorage = myStorage;
        this.optionText = [];
        this.Options = [10];
        this.question = new Question_1.AssessmentQuestions();
        this.optionList = [];
        this.submitted = false;
        this.optionsValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.MigrationData = [];
        this.CloudProviderData = [];
        this.MigrationDataArray = [];
        this.CloudProviderDataArray = [];
    }
    AddAssessmentQuestionComponent.prototype.ngOnInit = function () {
        this.clientIdValue = this.myStorage.getCurrentUserObject().clientId;
    };
    AddAssessmentQuestionComponent.prototype.selectChangeHandler = function (event) {
        this.numberOfOptions = parseInt(event.target.value, 10);
        for (var index = 1; index <= this.numberOfOptions; index++) {
            this.Options[index] = index;
        }
    };
    AddAssessmentQuestionComponent.prototype.options = function () {
        for (var index = 0; index < this.question.numberOfOption; index++) {
            this.Options[index] = index;
        }
    };
    AddAssessmentQuestionComponent.prototype.newQuestion = function () {
        this.submitted = false;
        this.question = new Question_1.AssessmentQuestions();
    };
    AddAssessmentQuestionComponent.prototype.save = function () {
        for (var index = 0; index < this.optionText.length; index++) {
            var option = new Option_1.QuestionOption();
            option.optionText = this.optionText[index];
            //  console.log(option);
            this.question.questionOption[index] = option;
            //  console.log(this.question.questionOption[index]);
        }
        for (var index = 0; index < this.MigrationData.length; index++) {
            if (this.MigrationData[index].migrationPattern != false) {
                var migration = new MigrationRule_1.MigrationRule();
                migration.migrationId = this.MigrationData[index].migrationId;
                migration.clientId = this.myStorage.getCurrentUserObject().clientId;
                migration.questionText = this.question.questionText;
                this.question.migrationRule[index] = migration;
            }
        }
        for (var index = 0; index < this.CloudProviderData.length; index++) {
            if (this.CloudProviderData[index].cloudProviders != false) {
                var cloudProvider = new CloudProviderRule_1.CloudProviderRule();
                cloudProvider.cloudProviderId = this.CloudProviderData[index].cloudProviderId;
                cloudProvider.questionText = this.question.questionText;
                cloudProvider.clientId = this.myStorage.getCurrentUserObject().clientId;
                this.question.cloudProviderRules[index] = cloudProvider;
            }
        }
        this.question.clientId = this.myStorage.getCurrentUserObject().clientId;
        this.question.createdBy = this.myStorage.getCurrentUserObject().userName;
        console.log(this.question);
        this.questionService.createQuestionn(this.question).subscribe();
        location.reload();
        this.router.navigate(['/assessment-questions']);
    };
    AddAssessmentQuestionComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.save();
    };
    AddAssessmentQuestionComponent.prototype.assessmentTypeForMigrationClick = function (event) {
        var _this = this;
        console.log(event.target.checked);
        this.assessmentTypeForMigrationValue = event.target.checked;
        this.questionService.getMigrationData().subscribe(function (result) {
            _this.MigrationData = result;
            for (var index = 0; index < _this.MigrationData.length; index++) {
                _this.MigrationDataArray[index] = _this.MigrationData[index].migrationPattern;
            }
        });
    };
    AddAssessmentQuestionComponent.prototype.assessmentTypeForCloudProviderClick = function (event) {
        var _this = this;
        this.assessmentTypeForCloudProvider = event.target.checked;
        this.questionService.getCloudProviderData().subscribe(function (result) {
            _this.CloudProviderData = result;
            for (var index = 0; index < _this.CloudProviderData.length; index++) {
                _this.CloudProviderDataArray[index] = _this.CloudProviderData[index].cloudProviders;
            }
        });
    };
    AddAssessmentQuestionComponent = __decorate([
        core_1.Component({
            selector: 'app-add-assessment-question',
            templateUrl: './add-assessment-question.component.html',
            styleUrls: ['./add-assessment-question.component.scss']
        }),
        __metadata("design:paramtypes", [assessment_questions_service_1.AssessmentQuestionsService, router_1.Router, http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], AddAssessmentQuestionComponent);
    return AddAssessmentQuestionComponent;
}());
exports.AddAssessmentQuestionComponent = AddAssessmentQuestionComponent;
//# sourceMappingURL=add-assessment-question.component.js.map