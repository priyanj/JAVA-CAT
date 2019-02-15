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
var user_service_1 = require("../service/user.service");
var router_1 = require("@angular/router");
var localStorage_service_1 = require("../utility/localStorage.service");
var DataTablesResponse = /** @class */ (function () {
    function DataTablesResponse() {
    }
    return DataTablesResponse;
}());
var UserComponents = /** @class */ (function () {
    function UserComponents(userService, router, http, myStorage) {
        this.userService = userService;
        this.router = router;
        this.http = http;
        this.myStorage = myStorage;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.userData = [];
    }
    UserComponents.prototype.ngOnInit = function () {
        var _this = this;
        this.dtOptions = {
            pagingType: 'first_last_numbers',
            pageLength: 10,
            responsive: true
        };
        this.userService.getUsers().subscribe(function (result) {
            _this.userData = result;
            console.log(result);
            _this.dtTrigger.next();
        });
    };
    UserComponents.prototype.back = function () {
        this.router.navigate(['/dashboard']);
    };
    UserComponents = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: '../view/user.component.html',
            styleUrls: ['../view/user.component.scss']
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router, http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], UserComponents);
    return UserComponents;
}());
exports.UserComponents = UserComponents;
//# sourceMappingURL=user.component.js.map