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
var AssesstApplicationService = /** @class */ (function () {
    function AssesstApplicationService(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:8090/answer/save';
        this.AllRuleUrl = 'http://localhost:8090/application/AllRuleCheck';
        this.UpdateAnswersUrl = 'http://localhost:8090/answer/getAnswersByApplicationId/7';
    }
    AssesstApplicationService.prototype.CollecOptiontData = function (clientId) {
        var url = 'http://localhost:8090/assessmentQuestions/getAllQuestions';
        return this.http.get(url + "/" + clientId);
    };
    AssesstApplicationService.prototype.saveAssessApplication = function (cloudablerule) {
        return this.http.post("" + this.baseUrl + "/create", cloudablerule);
    };
    AssesstApplicationService.prototype.UpdateAnswers = function (applicationId) {
        return this.http.get("" + this.UpdateAnswersUrl);
    };
    AssesstApplicationService.prototype.saveAssessApplicationUpdate = function (cloudablerule) {
        return this.http.put("" + this.baseUrl + "/create", cloudablerule);
    };
    AssesstApplicationService.prototype.AllRuleCheck = function (applicationId) {
        return this.http.get("" + this.AllRuleUrl + "/" + applicationId);
    };
    AssesstApplicationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AssesstApplicationService);
    return AssesstApplicationService;
}());
exports.AssesstApplicationService = AssesstApplicationService;
//# sourceMappingURL=assesst-application.service.js.map