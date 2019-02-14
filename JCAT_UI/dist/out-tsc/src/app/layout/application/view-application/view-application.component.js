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
var rxjs_1 = require("rxjs");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var application_service_1 = require("../application.service");
var DataTablesResponse = /** @class */ (function () {
    function DataTablesResponse() {
    }
    return DataTablesResponse;
}());
var ViewApplicationComponent = /** @class */ (function () {
    function ViewApplicationComponent(router, http, applicationService) {
        this.router = router;
        this.http = http;
        this.applicationService = applicationService;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.AllData = [];
    }
    ViewApplicationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 2,
            responsive: true
        };
        this.applicationService.question.subscribe(function (data) { return _this.message = data; });
    };
    ViewApplicationComponent = __decorate([
        core_1.Component({
            selector: 'app-view-application',
            templateUrl: './view-application.component.html',
            styleUrls: ['./view-application.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router, http_1.HttpClient, application_service_1.ApplicationService])
    ], ViewApplicationComponent);
    return ViewApplicationComponent;
}());
exports.ViewApplicationComponent = ViewApplicationComponent;
//# sourceMappingURL=view-application.component.js.map