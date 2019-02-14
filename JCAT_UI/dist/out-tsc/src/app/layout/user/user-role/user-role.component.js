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
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var user_role_service_1 = require("./user-role.service");
var localStorage_service_1 = require("../../utility/service/localStorage.service");
var DataTablesResponse = /** @class */ (function () {
    function DataTablesResponse() {
    }
    return DataTablesResponse;
}());
var UserRoleComponent = /** @class */ (function () {
    function UserRoleComponent(userRoleService, router, http, myStorage) {
        this.userRoleService = userRoleService;
        this.router = router;
        this.http = http;
        this.myStorage = myStorage;
        this.userRoleData = [];
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
    }
    UserRoleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userName = this.myStorage.getCurrentUserObject().userName;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            responsive: true
        };
        this.userRoleService.getApplicationByUserName(this.userName).subscribe(function (result) {
            _this.userRoleData = result;
            _this.dtTrigger.next();
        });
    };
    UserRoleComponent.prototype.assessApplication = function (formvalues) {
        this.userRoleService.sendMsgtoOtherComponent(formvalues);
        this.router.navigate(['/application/assesst-application']);
    };
    UserRoleComponent.prototype.ViewApplication = function (formvalues) {
        this.userRoleService.sendMsgtoOtherComponent(formvalues);
        this.router.navigate(['/application/view-application']);
    };
    UserRoleComponent = __decorate([
        core_1.Component({
            selector: 'app-user-role',
            templateUrl: './user-role.component.html',
            styleUrls: ['./user-role.component.scss']
        }),
        __metadata("design:paramtypes", [user_role_service_1.UserRoleService, router_1.Router, http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], UserRoleComponent);
    return UserRoleComponent;
}());
exports.UserRoleComponent = UserRoleComponent;
//# sourceMappingURL=user-role.component.js.map