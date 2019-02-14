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
var router_1 = require("@angular/router");
var Application_1 = require("../Application");
var application_service_1 = require("../application.service");
var UpdateApplicationComponent = /** @class */ (function () {
    function UpdateApplicationComponent(router, applicationService) {
        this.router = router;
        this.applicationService = applicationService;
        this.application = new Application_1.Application();
        this.applicationObject = new Application_1.Application();
    }
    UpdateApplicationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.applicationService.question.subscribe(function (data) { _this.app = data; });
    };
    UpdateApplicationComponent.prototype.updateActive = function (application) {
        this.applicationObject = application;
        this.applicationObject.modifiedBy = localStorage.getItem('userName');
        this.applicationService.updateApplication(this.applicationObject).subscribe();
        this.router.navigate(['/application']);
    };
    UpdateApplicationComponent.prototype.onSubmit = function (formvalues) {
        this.application = formvalues;
        this.updateActive(this.application);
    };
    UpdateApplicationComponent = __decorate([
        core_1.Component({
            selector: 'app-update-application',
            templateUrl: './update-application.component.html',
            styleUrls: ['./update-application.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router, application_service_1.ApplicationService])
    ], UpdateApplicationComponent);
    return UpdateApplicationComponent;
}());
exports.UpdateApplicationComponent = UpdateApplicationComponent;
//# sourceMappingURL=update-application.component.js.map