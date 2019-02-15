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
var AssessmentService = /** @class */ (function () {
    function AssessmentService(http, myStorage) {
        this.http = http;
        this.myStorage = myStorage;
    }
    AssessmentService.prototype.ngOnInit = function () {
    };
    AssessmentService.prototype.getAnswers = function (applicationId) {
        return this.http.get(this.myStorage.getdomainURL() + "/assessment/answer/get/" + applicationId);
    };
    AssessmentService.prototype.saveAnswers = function (answerList, applicationId) {
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.myStorage.getdomainURL() + "/assessment/answer/create/" + applicationId, answerList);
    };
    AssessmentService.prototype.finalized = function (answerList, applicationId, assessmentStage) {
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.myStorage.getdomainURL() + "/assessment/finalize/" + applicationId + "/" + assessmentStage, answerList);
    };
    AssessmentService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], AssessmentService);
    return AssessmentService;
}());
exports.AssessmentService = AssessmentService;
//# sourceMappingURL=assessment.service.js.map