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
var rxjs_1 = require("rxjs");
var localStorage_service_1 = require("../utility/service/localStorage.service");
var AssessmentQuestionsService = /** @class */ (function () {
    function AssessmentQuestionsService(http, myStorage) {
        this.http = http;
        this.myStorage = myStorage;
        this.comptransfer = new rxjs_1.BehaviorSubject("Assessment Questions");
        this.question = this.comptransfer.asObservable();
    }
    AssessmentQuestionsService.prototype.getAllQuestions = function (clientId) {
        return this.http.get(this.myStorage.getdomainURL() + "/assessmentQuestions/getAllQuestions/" + clientId);
    };
    AssessmentQuestionsService.prototype.deleteQuestion = function (questionId) {
        return this.http.delete(this.myStorage.getdomainURL() + "/assessmentQuestions/deleteQuestions/" + questionId, {
            responseType: 'text'
        });
    };
    AssessmentQuestionsService.prototype.updateQuestions = function (question) {
        return this.http.put(this.myStorage.getdomainURL() + "/assessmentQuestions/updateQuestions/update", question);
    };
    AssessmentQuestionsService.prototype.sendMsgtoOtherComponent = function (messsage) {
        this.comptransfer.next(messsage);
    };
    AssessmentQuestionsService.prototype.getMigrationData = function () {
        this.clienIdValue = this.myStorage.getCurrentUserObject().clientId;
        return this.http.get(this.myStorage.getdomainURL() + "/migrationRule/getAll/" + this.clienIdValue);
    };
    AssessmentQuestionsService.prototype.getCloudProviderData = function () {
        this.clienIdValue = this.myStorage.getCurrentUserObject().clientId;
        return this.http.get(this.myStorage.getdomainURL() + "/cloudProvider/getAll/" + this.clienIdValue);
    };
    AssessmentQuestionsService.prototype.createQuestionn = function (question) {
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.myStorage.getdomainURL() + "/assessmentQuestions/saveAssessmentQuestions/create", question);
    };
    AssessmentQuestionsService.prototype.updateAssessmentQuestions = function (value) {
        return this.http.put(this.myStorage.getdomainURL + "/assessmentQuestions/updateQuestions/update", value);
    };
    AssessmentQuestionsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], AssessmentQuestionsService);
    return AssessmentQuestionsService;
}());
exports.AssessmentQuestionsService = AssessmentQuestionsService;
//# sourceMappingURL=assessment-questions.service.js.map