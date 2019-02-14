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
var help_service_1 = require("./help.service");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var issue_1 = require("./issue");
var localStorage_service_1 = require("../utility/service/localStorage.service");
var HelpComponent = /** @class */ (function () {
    function HelpComponent(helpService, router, http, myStorage) {
        this.helpService = helpService;
        this.router = router;
        this.http = http;
        this.myStorage = myStorage;
        this.issues = new issue_1.issue();
    }
    HelpComponent.prototype.ngOnInit = function () {
    };
    HelpComponent.prototype.submit = function () {
        this.issues.issue = this.textfield;
        this.issues.userName = this.myStorage.getCurrentUserObject().userName;
        this.issues.clientId = this.myStorage.getCurrentUserObject().clientId;
        this.helpService.saveIssue(this.issues).subscribe();
        this.router.navigate(['/dashboard']);
    };
    HelpComponent = __decorate([
        core_1.Component({
            selector: 'app-help',
            templateUrl: './help.component.html',
            styleUrls: ['./help.component.scss']
        }),
        __metadata("design:paramtypes", [help_service_1.HelpService, router_1.Router, http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], HelpComponent);
    return HelpComponent;
}());
exports.HelpComponent = HelpComponent;
//# sourceMappingURL=help.component.js.map