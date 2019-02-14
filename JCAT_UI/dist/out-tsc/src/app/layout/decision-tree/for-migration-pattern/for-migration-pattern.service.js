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
var ForMigrationPatternService = /** @class */ (function () {
    function ForMigrationPatternService(http, myStorage) {
        this.http = http;
        this.myStorage = myStorage;
        this.comptransfer = new rxjs_1.BehaviorSubject("migration pattern");
        this.question = this.comptransfer.asObservable();
    }
    ForMigrationPatternService.prototype.getAllMigrationData = function () {
        this.clientIdValue = this.myStorage.getCurrentUserObject().clientId;
        return this.http.get(this.myStorage.getdomainURL() + "/migrationRule/getAll/" + this.clientIdValue);
    };
    ForMigrationPatternService.prototype.getAssessmentQuestions = function () {
        return this.http.get(this.myStorage.getdomainURL() + "/assessmentQuestions/getAllQuestions");
    };
    ForMigrationPatternService.prototype.getMigrationQuestions = function (migrationId) {
        this.clientIdValue = this.myStorage.getCurrentUserObject().clientId;
        return this.http.get(this.myStorage.getdomainURL() + ("/assessmentQuestions/getAllMigrationPattern/" + migrationId + "/" + this.clientIdValue));
    };
    ForMigrationPatternService.prototype.updateMigrationRule = function (value) {
        this.clientIdValue = this.myStorage.getCurrentUserObject().clientId;
        return this.http.put(this.myStorage.getdomainURL() + "/migrationRule/updateMigrationRule/" + this.clientIdValue, value);
    };
    ForMigrationPatternService.prototype.saveEvaluationOrder = function (migration) {
        return this.http.post(this.myStorage.getdomainURL() + "/migrationRule/setExceutionOrder/create", migration);
    };
    ForMigrationPatternService.prototype.sendMsgtoOtherComponent = function (messsage) {
        this.comptransfer.next(messsage);
    };
    ForMigrationPatternService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], ForMigrationPatternService);
    return ForMigrationPatternService;
}());
exports.ForMigrationPatternService = ForMigrationPatternService;
//# sourceMappingURL=for-migration-pattern.service.js.map