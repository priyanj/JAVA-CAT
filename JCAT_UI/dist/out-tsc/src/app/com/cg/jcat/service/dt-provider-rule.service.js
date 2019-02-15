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
var DTProviderRuleService = /** @class */ (function () {
    function DTProviderRuleService(http, myStorage) {
        this.http = http;
        this.myStorage = myStorage;
    }
    DTProviderRuleService.prototype.ngOnInit = function () {
    };
    DTProviderRuleService.prototype.getCloudProviderRules = function (providerId) {
        return this.http.get(this.myStorage.getdomainURL() + "/cloudProvider/getAllRules/" + providerId);
    };
    DTProviderRuleService.prototype.saveCloudProviderRule = function (cloudProviderRuleModelList) {
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.myStorage.getdomainURL() + "/cloudProvider/create", cloudProviderRuleModelList);
    };
    DTProviderRuleService.prototype.getCloudProvider = function () {
        return this.http.get(this.myStorage.getdomainURL() + "/cloudProvider/getAll");
    };
    DTProviderRuleService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], DTProviderRuleService);
    return DTProviderRuleService;
}());
exports.DTProviderRuleService = DTProviderRuleService;
//# sourceMappingURL=dt-provider-rule.service.js.map