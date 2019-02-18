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
var http_1 = require("@angular/common/http");
var localStorage_service_1 = require("../utility/localStorage.service");
var AssessmentQuestionsService = /** @class */ (function () {
    function AssessmentQuestionsService(http, myStorage) {
        this.http = http;
        this.myStorage = myStorage;
    }
    AssessmentQuestionsService.prototype.getAllQuestions = function () {
        return this.http.get(this.myStorage.getdomainURL() + "/assessmentQuestion/getAll");
    };
    AssessmentQuestionsService.prototype.getQuestionType = function () {
        return this.http.get(this.myStorage.getdomainURL() + "/assessmentQuestion/getQuestionType");
    };
    AssessmentQuestionsService.prototype.getQuestionById = function (questionId) {
        return this.http.get(this.myStorage.getdomainURL() + "/assessmentQuestion/get/question/" + questionId);
    };
    AssessmentQuestionsService.prototype.saveQuestions = function (question) {
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.myStorage.getdomainURL() + "/assessmentQuestion/createQuestion", question);
    };
    AssessmentQuestionsService.prototype.updateQuestion = function (value) {
        return this.http.put(this.myStorage.getdomainURL + "/assessmentQuestion/updateQuestion", value);
    };
    AssessmentQuestionsService.prototype.deleteQuestion = function (questionId) {
        return this.http.delete(this.myStorage.getdomainURL() + "/assessmentQuestion/deleteQuestion/" + questionId, {
            responseType: 'text'
        });
    };
    AssessmentQuestionsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], AssessmentQuestionsService);
    return AssessmentQuestionsService;
}());
exports.AssessmentQuestionsService = AssessmentQuestionsService;
//# sourceMappingURL=assessment-questions.service.js.map