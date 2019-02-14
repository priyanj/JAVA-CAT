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
var localStorage_service_1 = require("../../utility/service/localStorage.service");
var MigrationRule_1 = require("../MigrationRule");
var CloudProviderRule_1 = require("../CloudProviderRule");
var Option_1 = require("../Option");
var UpdateQuestionComponent = /** @class */ (function () {
    function UpdateQuestionComponent(assessmentQuestionsService, router, myStorage) {
        this.assessmentQuestionsService = assessmentQuestionsService;
        this.router = router;
        this.myStorage = myStorage;
        this.questionList = new Question_1.AssessmentQuestions();
        this.MigrationData = [];
        this.CloudProviderData = [];
        this.MigrationDataArray = [];
        this.CloudProviderDataArray = [];
        this.question = new Question_1.AssessmentQuestions();
        this.updatedQuestion = new Question_1.AssessmentQuestions();
        this.questionObject = new Question_1.AssessmentQuestions();
        this.questionUpdate = new Question_1.AssessmentQuestions();
        this.submitted = false;
        this.optionsValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.Options = [10];
        this.OptionsArray = [];
    }
    UpdateQuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.assessmentQuestionsService.question.subscribe(function (data) { _this.que = data; });
        this.question = this.que;
        console.log("~~~~~~~~~~~~~~~~~~~~~`````````````````~~~~~~~~~~~" + this.question.questionId);
        this.numberOfOptions = 0;
        var option = this.optionsValues;
        // console.log(this.que.questionOption.length);
        // console.log(this.question.questionOption.length);
        // console.log(this.numberOfOptions);
        this.numberOfOptions = this.question.questionOption.length;
        for (var index = 0; index < this.numberOfOptions; index++) {
            this.OptionsArray[index] = this.question.questionOption[index].optionText;
        }
        this.selectChangeHandlerDefault(this.numberOfOptions);
    };
    UpdateQuestionComponent.prototype.assessmentTypeForMigrationClick = function (event) {
        var _this = this;
        console.log(event.target.checked);
        this.assessmentTypeForMigrationValue = event.target.checked;
        this.assessmentQuestionsService.getMigrationData().subscribe(function (result) {
            _this.MigrationData = result;
            console.log(JSON.stringify(_this.MigrationData));
            console.log("********************************************************");
            for (var index = 0; index < _this.MigrationData.length; index++) {
                _this.MigrationDataArray[index] = _this.MigrationData[index].migrationPattern;
            }
        });
    };
    UpdateQuestionComponent.prototype.assessmentTypeForCloudProviderClick = function (event) {
        var _this = this;
        this.assessmentTypeForCloudProvider = event.target.checked;
        this.assessmentQuestionsService.getCloudProviderData().subscribe(function (result) {
            _this.CloudProviderData = result;
            for (var index = 0; index < _this.CloudProviderData.length; index++) {
                _this.CloudProviderDataArray[index] = _this.CloudProviderData[index].cloudProviders;
            }
        });
    };
    UpdateQuestionComponent.prototype.selectChangeHandlerDefault = function (value) {
        this.numberOfOptions = value;
        for (var index = 1; index <= this.numberOfOptions; index++) {
            this.Options[index] = index;
        }
    };
    UpdateQuestionComponent.prototype.selectChangeHandler = function (event) {
        this.numberOfOptions = parseInt(event.target.value, 10);
        for (var index = 1; index <= this.numberOfOptions; index++) {
            this.Options[index] = index;
        }
    };
    UpdateQuestionComponent.prototype.updateQue = function (updatedQuestion) {
        this.questionObject = updatedQuestion;
        for (var index = 0; index < this.OptionsArray.length; index++) {
            var option = new Option_1.QuestionOption();
            option.optionText = this.OptionsArray[index];
            // this.questionUpdate
            this.questionUpdate.questionOption[index] = option;
            // console.log(this.questionUpdate.questionOption[index]);
        }
        for (var index = 0; index < this.MigrationData.length; index++) {
            if (this.MigrationData[index].migrationPattern != false) {
                var migration = new MigrationRule_1.MigrationRule();
                migration.migrationId = this.MigrationData[index].migrationId;
                migration.clientId = this.myStorage.getCurrentUserObject().clientId;
                migration.questionText = this.updatedQuestion.questionText;
                this.questionUpdate.migrationRule[index] = migration;
                console.log(this.questionUpdate.migrationRule[index]);
            }
        }
        for (var index = 0; index < this.CloudProviderData.length; index++) {
            if (this.CloudProviderData[index].cloudProviders) {
                var cloudProvider = new CloudProviderRule_1.CloudProviderRule();
                cloudProvider.cloudProviderId = this.CloudProviderData[index].cloudProviderId;
                cloudProvider.questionText = this.updatedQuestion.questionText;
                cloudProvider.clientId = this.myStorage.getCurrentUserObject().clientId;
                this.questionUpdate.cloudProviderRules[index] = cloudProvider;
            }
        }
        //  this.questionUpdate.assessmentTypeForCloudable=this.updatedQuestion.assessmentTypeForCloudable;
        console.log(this.updatedQuestion.assessmentTypeForCloudable);
        if (this.updatedQuestion.assessmentTypeForCloudable) {
            this.questionUpdate.assessmentTypeForCloudable = "true";
        }
        else {
            this.questionUpdate.assessmentTypeForCloudable = null;
        }
        console.log(this.questionUpdate.assessmentTypeForCloudable);
        this.questionUpdate.clientId = this.myStorage.getCurrentUserObject().clientId;
        if (this.updatedQuestion.assessmentTypeForCloudProvider) {
            this.questionUpdate.assessmentTypeForCloudProvider = "true";
        }
        else {
            this.questionUpdate.assessmentTypeForCloudProvider = null;
            this.questionUpdate.cloudProviderRules = null;
        }
        console.log(this.questionUpdate.assessmentTypeForCloudProvider);
        if (this.updatedQuestion.assessmentTypeForMigration) {
            this.questionUpdate.assessmentTypeForMigration = "true";
        }
        else {
            this.questionUpdate.assessmentTypeForMigration = null;
            this.questionUpdate.migrationRule = null;
        }
        //  this.questionUpdate.assessmentTypeForMigration=this.updatedQuestion.assessmentTypeForMigration;
        this.questionUpdate.modifiedBy = this.myStorage.getCurrentUserObject().userName;
        this.questionUpdate.questionDescription = this.updatedQuestion.questionDescription;
        this.questionUpdate.questionText = this.updatedQuestion.questionText;
        this.questionUpdate.questionDisplayOrder = this.updatedQuestion.questionDisplayOrder;
        this.questionUpdate.numberOfOption = this.updatedQuestion.numberOfOption;
        this.questionUpdate.questionType = this.updatedQuestion.questionType;
        this.questionUpdate.questionId = this.question.questionId;
        console.log(this.questionUpdate);
        this.assessmentQuestionsService.updateQuestions(this.questionUpdate).subscribe();
        // this.questionObject.modifiedBy=this.myStorage.getCurrentUserObject().userName;
        this.router.navigate(['/assessment-questions']);
    };
    UpdateQuestionComponent.prototype.onSubmit = function (formvalues) {
        this.updatedQuestion = formvalues;
        // console.log(this.updatedQuestion);
        this.updateQue(this.updatedQuestion);
    };
    UpdateQuestionComponent = __decorate([
        core_1.Component({
            selector: 'app-update-question',
            templateUrl: './update-question.component.html',
            styleUrls: ['./update-question.component.scss']
        }),
        __metadata("design:paramtypes", [assessment_questions_service_1.AssessmentQuestionsService, router_1.Router, localStorage_service_1.LocalStorageService])
    ], UpdateQuestionComponent);
    return UpdateQuestionComponent;
}());
exports.UpdateQuestionComponent = UpdateQuestionComponent;
//# sourceMappingURL=update-question.component.js.map