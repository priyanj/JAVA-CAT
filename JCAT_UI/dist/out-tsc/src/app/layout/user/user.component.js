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
var user_service_1 = require("./user.service");
var rxjs_1 = require("rxjs");
var Angular5_csv_1 = require("angular5-csv/Angular5-csv");
var localStorage_service_1 = require("../utility/service/localStorage.service");
var DataTablesResponse = /** @class */ (function () {
    function DataTablesResponse() {
    }
    return DataTablesResponse;
}());
var UserComponent = /** @class */ (function () {
    function UserComponent(userService, router, http, myStorage) {
        this.userService = userService;
        this.router = router;
        this.http = http;
        this.myStorage = myStorage;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.users = [];
        this.userData = [];
    }
    UserComponent.prototype.addUser = function () {
        this.userService.sendIpAddresstoOtherComponent(this.IpAddress);
        this.router.navigate(['/user/add-user']);
    };
    UserComponent.prototype.updateUser = function (user) {
        this.userService.sendMsgtoOtherComponent(user);
        this.router.navigate(['/user/update-user']);
    };
    UserComponent.prototype.deleteUser = function (formvalues) {
        this.userService.deleteUser(formvalues).subscribe(function (data) { }, function (error) { return console.log('ERROR: ' + error); });
        location.reload();
        this.router.navigate(['/user']);
    };
    UserComponent.prototype.deactivate = function (formvalues) {
        this.userService.deactivate(formvalues).subscribe();
    };
    UserComponent.prototype.uploadUserInfo = function () {
        this.userService.sendIpAddresstoOtherComponent(this.IpAddress);
        this.router.navigate(['/user/upload-user']);
    };
    UserComponent.prototype.exportCsvTemplate = function () {
        var filename = "Users";
        var options = {
            headers: ["User Name", "First Name", "Last Name", "Company", "UserType"]
        };
        new Angular5_csv_1.Angular5Csv(this.users, filename, options);
    };
    UserComponent.prototype.exportCsv = function () {
        var filename = "UserDetails";
        for (var index = 0; index < this.userData.length; index++) {
            this.users[index] = this.userData[index];
        }
        var options = {
            headers: ["userId", "userName", "firstName", "lastName", "password", "ipAddress", "lastLogin", "company", "isDeleted",
                "isDeactivate", "createdDateTime", "createdBy", "modifiedDateTime", "modifiedBy", "isAdmin"]
        };
        new Angular5_csv_1.Angular5Csv(this.users, filename, options);
    };
    UserComponent.prototype.help = function () {
        this.myStorage.setComponent('user');
        this.router.navigate(['/help']);
    };
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.clientIdValue = this.myStorage.getCurrentUserObject().clientId;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            responsive: true
        };
        this.userService.getIpAddress().subscribe(function (data) {
            _this.IpAddress = data['ip'];
            _this.userService.getAllUsers(_this.clientIdValue).subscribe(function (result) {
                _this.userData = result;
                _this.dtTrigger.next();
            });
        });
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.scss']
        }),
        __metadata("design:paramtypes", [user_service_1.UsersService, router_1.Router, http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map