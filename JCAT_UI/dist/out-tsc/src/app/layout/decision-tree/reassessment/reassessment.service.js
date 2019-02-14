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
var localStorage_service_1 = require("../../utility/service/localStorage.service");
var ServiceService = /** @class */ (function () {
    function ServiceService(http, myStorage) {
        this.http = http;
        this.myStorage = myStorage;
    }
    ServiceService.prototype.reassessmentData = function () {
        this.clientIdValue = this.myStorage.getCurrentUserObject().clientId;
        return this.http.get(this.myStorage.getdomainURL() + "/application/getAllReassessment/" + this.clientIdValue);
    };
    ServiceService.prototype.cloudProvider = function (applicationId) {
        return this.http.get(this.myStorage.getdomainURL() + "/application/cloudProviderCheck/" + applicationId);
    };
    ServiceService.prototype.migrationPattern = function (applicationId) {
        return this.http.get(this.myStorage.getdomainURL() + "/application/migrationCheck/" + applicationId);
    };
    ServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], ServiceService);
    return ServiceService;
}());
exports.ServiceService = ServiceService;
//# sourceMappingURL=reassessment.service.js.map