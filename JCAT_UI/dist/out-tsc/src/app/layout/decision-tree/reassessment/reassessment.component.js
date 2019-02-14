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
var reassessment_service_1 = require("./reassessment.service");
var ReassessmentComponent = /** @class */ (function () {
    function ReassessmentComponent(router, reassessmentService, http) {
        this.router = router;
        this.reassessmentService = reassessmentService;
        this.http = http;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.reassessmentDataValue = [];
        this.applicationIdArray = [];
        this.i = 0;
        this.j = 0;
    }
    ReassessmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            responsive: true
        };
        this.reassessmentService.reassessmentData().subscribe(function (result) {
            _this.reassessmentDataValue = result;
            _this.dtTrigger.next();
        });
    };
    ReassessmentComponent.prototype.runRule = function () {
        for (var index = 0; index < this.applicationIdArray.length; index++) {
            if (this.cloudProviderCheckbox) {
                this.reassessmentService.cloudProvider(this.applicationIdArray[index]).subscribe();
            }
            if (this.migrationCheckbox) {
                this.reassessmentService.migrationPattern(this.applicationIdArray[index]).subscribe();
            }
        }
    };
    ReassessmentComponent.prototype.migrationPatternMethod = function (values) {
        this.migrationCheckbox = values.currentTarget.checked;
    };
    ReassessmentComponent.prototype.cloudProviderMethod = function (values) {
        this.cloudProviderCheckbox = values.currentTarget.checked;
    };
    ReassessmentComponent.prototype.applicationNameChange = function (e, applicationId) {
        if (e.currentTarget.checked) {
            this.applicationIdArray[this.i] = applicationId;
            this.i++;
        }
        else {
            for (var index = 0; index < this.applicationIdArray.length; index++) {
                if (this.applicationIdArray[index] == applicationId) {
                    this.applicationIdArray.splice(index, 1);
                }
            }
        }
    };
    ReassessmentComponent = __decorate([
        core_1.Component({
            selector: 'app-reassessment',
            templateUrl: './reassessment.component.html',
            styleUrls: ['./reassessment.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router, reassessment_service_1.ServiceService, http_1.HttpClient])
    ], ReassessmentComponent);
    return ReassessmentComponent;
}());
exports.ReassessmentComponent = ReassessmentComponent;
//# sourceMappingURL=reassessment.component.js.map