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
var add_application_service_1 = require("./add-application.service");
var Application_1 = require("../Application");
var localStorage_service_1 = require("../../utility/service/localStorage.service");
var AddApplicationComponent = /** @class */ (function () {
    function AddApplicationComponent(myStorage, router, addapplicationService) {
        this.myStorage = myStorage;
        this.router = router;
        this.addapplicationService = addapplicationService;
        this.application = new Application_1.Application();
        this.submitted = false;
    }
    AddApplicationComponent.prototype.ngOnInit = function () {
        this.clientIdValue = this.myStorage.getCurrentUserObject().clientId;
    };
    AddApplicationComponent.prototype.createApplication = function () {
        this.submitted = false;
        this.application = new Application_1.Application();
    };
    AddApplicationComponent.prototype.save = function () {
        this.application.clientId = this.myStorage.getCurrentUserObject().clientId;
        this.application.createdBy = this.myStorage.getCurrentUserObject().userName;
        this.addapplicationService.createApplication(this.application)
            .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
        this.application = new Application_1.Application();
        this.router.navigate(['/application']);
    };
    AddApplicationComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.save();
    };
    AddApplicationComponent = __decorate([
        core_1.Component({
            selector: 'app-add-application',
            templateUrl: './add-application.component.html',
            styleUrls: ['./add-application.component.scss']
        }),
        __metadata("design:paramtypes", [localStorage_service_1.LocalStorageService, router_1.Router, add_application_service_1.AddApplicationService])
    ], AddApplicationComponent);
    return AddApplicationComponent;
}());
exports.AddApplicationComponent = AddApplicationComponent;
//# sourceMappingURL=add-application.component.js.map