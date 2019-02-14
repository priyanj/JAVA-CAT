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
var localStorage_service_1 = require("../../utility/service/localStorage.service");
var ForCloudProviderService = /** @class */ (function () {
    function ForCloudProviderService(http, myStorage) {
        this.http = http;
        this.myStorage = myStorage;
        this.comptransfer = new rxjs_1.BehaviorSubject("cloud provider");
        this.cloudProviderId = this.comptransfer.asObservable();
    }
    ForCloudProviderService.prototype.CollectData = function () {
        this.clientIdValue = this.myStorage.getCurrentUserObject().clientId;
        return this.http.get(this.myStorage.getdomainURL() + "/cloudProvider/getAll/" + this.clientIdValue);
    };
    ForCloudProviderService.prototype.saveEvaluationOrder = function (evaluationOrder) {
        return this.http.put(this.myStorage.getdomainURL() + "/cloudProvider/setEvaluationOrder", evaluationOrder);
    };
    ForCloudProviderService.prototype.sendCloudProviderIdtoOtherComponent = function (messsage) {
        this.comptransfer.next(messsage);
    };
    ForCloudProviderService.prototype.CollectCloudableRuleQuestions = function (cloudproviderId) {
        this.clientIdValue = this.myStorage.getCurrentUserObject().clientId;
        return this.http.get(this.myStorage.getdomainURL() + "/assessmentQuestions/getAllCloudProviderRule/" + cloudproviderId + "/" + this.clientIdValue);
    };
    ForCloudProviderService.prototype.updateCloudProviderRule = function (cloudableRule) {
        this.clientIdValue = this.myStorage.getCurrentUserObject().clientId;
        return this.http.put(this.myStorage.getdomainURL() + "/cloudProvider/updateCloudProviderRule" + "/" + this.clientIdValue, cloudableRule);
    };
    ForCloudProviderService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], ForCloudProviderService);
    return ForCloudProviderService;
}());
exports.ForCloudProviderService = ForCloudProviderService;
//# sourceMappingURL=for-cloud-provider.service.js.map