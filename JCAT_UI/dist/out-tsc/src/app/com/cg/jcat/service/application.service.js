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
var localStorage_service_1 = require("../utility/localStorage.service");
var ApplicationService = /** @class */ (function () {
    function ApplicationService(http, myStorage) {
        this.http = http;
        this.myStorage = myStorage;
        this.comptransfer = new rxjs_1.BehaviorSubject("Hello");
        this.question = this.comptransfer.asObservable();
    }
    ApplicationService.prototype.getAllAplication = function () {
        return this.http.get(this.myStorage.getdomainURL() + "/application/getAll");
    };
    ApplicationService.prototype.getApplicationByApplicationId = function (applicationId) {
        return this.http.get(this.myStorage.getdomainURL() + "/application/getApplication/" + applicationId);
    };
    ApplicationService.prototype.saveApplication = function (application) {
        return this.http.post(this.myStorage.getdomainURL() + "/application/create", application);
    };
    ApplicationService.prototype.deleteApplicationById = function (aid) {
        return this.http.delete(this.myStorage.getdomainURL() + "/application/delete/" + aid, { responseType: 'text' });
    };
    ApplicationService.prototype.deactivate = function (aid) {
        return this.http.put(this.myStorage.getdomainURL() + "/application/deactivate/" + aid, { responseType: 'text' });
    };
    ApplicationService.prototype.updateApplication = function (value) {
        return this.http.put(this.myStorage.getdomainURL() + "/application/update", value);
    };
    ApplicationService.prototype.import = function (value) {
        return this.http.post(this.myStorage.getdomainURL() + "/application/import", value);
    };
    ApplicationService.prototype.sendMsgtoOtherComponent = function (messsage) {
        this.comptransfer.next(messsage);
    };
    ApplicationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], ApplicationService);
    return ApplicationService;
}());
exports.ApplicationService = ApplicationService;
//# sourceMappingURL=application.service.js.map