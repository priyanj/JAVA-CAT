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
var DTCloudableRuleService = /** @class */ (function () {
    function DTCloudableRuleService(http, myStorage) {
        this.http = http;
        this.myStorage = myStorage;
    }
    DTCloudableRuleService.prototype.ngOnInit = function () {
    };
    DTCloudableRuleService.prototype.getCloudableRule = function () {
        return this.http.get(this.myStorage.getdomainURL() + "/dtcloudableRule/getAll");
    };
    DTCloudableRuleService.prototype.getAllCloudableQuestions = function () {
        return this.http.get(this.myStorage.getdomainURL() + "/dtcloudableRule/getCloudableQuestion");
    };
    DTCloudableRuleService.prototype.saveCloudableRule = function (dTCloudableRuleModelList) {
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.myStorage.getdomainURL() + "/dtcloudableRule/create", dTCloudableRuleModelList);
    };
    DTCloudableRuleService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], DTCloudableRuleService);
    return DTCloudableRuleService;
}());
exports.DTCloudableRuleService = DTCloudableRuleService;
//# sourceMappingURL=dt-cloudable-rule.service.js.map