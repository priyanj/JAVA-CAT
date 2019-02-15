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
var rxjs_1 = require("rxjs");
var AssessmentQuestion_1 = require("../entity/AssessmentQuestion");
var localStorage_service_1 = require("../utility/localStorage.service");
var assessment_questions_service_1 = require("../service/assessment-questions.service");
var DataTablesResponse = /** @class */ (function () {
    function DataTablesResponse() {
    }
    return DataTablesResponse;
}());
var AssessmentQuestionsComponent = /** @class */ (function () {
    function AssessmentQuestionsComponent(assessmentQuestionsService, router, http, myStorage) {
        this.assessmentQuestionsService = assessmentQuestionsService;
        this.router = router;
        this.http = http;
        this.myStorage = myStorage;
        this.question = new AssessmentQuestion_1.AssessmentQuestions();
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.assessmentQuestions = [];
        this.assessmentQuestionData = [];
    }
    AssessmentQuestionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            responsive: true
        };
        this.assessmentQuestionsService.getAllQuestions().subscribe(function (result) {
            _this.assessmentQuestionData = result;
            _this.dtTrigger.next();
        });
    };
    AssessmentQuestionsComponent.prototype.importQuestions = function () {
        this.router.navigate(['/assessment-questions/import-question']);
    };
    AssessmentQuestionsComponent.prototype.addAssessmentQuestions = function () {
        this.router.navigate(['/assessment-questions/add-assessment-question']);
    };
    AssessmentQuestionsComponent.prototype.deleteQuestions = function (formvalues) {
        this.assessmentQuestionsService.deleteQuestion(formvalues)
            .subscribe(function (data) {
        }, function (error) { return console.log('ERROR: ' + error); });
    };
    AssessmentQuestionsComponent.prototype.deactivate = function () {
        this.router.navigate(['/assessment-questions/update-question']);
    };
    AssessmentQuestionsComponent = __decorate([
        core_1.Component({
            selector: 'app-assessment-questions',
            templateUrl: '../view/assessment-question.component.html'
        }),
        __metadata("design:paramtypes", [assessment_questions_service_1.AssessmentQuestionsService, router_1.Router, http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], AssessmentQuestionsComponent);
    return AssessmentQuestionsComponent;
}());
exports.AssessmentQuestionsComponent = AssessmentQuestionsComponent;
//# sourceMappingURL=assessment-question.component.js.map