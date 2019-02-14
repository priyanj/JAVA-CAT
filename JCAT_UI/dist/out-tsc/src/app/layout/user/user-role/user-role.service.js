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
var UserRoleService = /** @class */ (function () {
    function UserRoleService(http) {
        this.http = http;
        this.comptransfer = new rxjs_1.BehaviorSubject("User Role");
        this.question = this.comptransfer.asObservable();
    }
    UserRoleService.prototype.getApplicationByUserName = function (userName) {
        return this.http.get("http://localhost:8090/application/getApplicationByUserName" + "/" + userName);
    };
    UserRoleService.prototype.sendMsgtoOtherComponent = function (messsage) {
        this.comptransfer.next(messsage);
    };
    UserRoleService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UserRoleService);
    return UserRoleService;
}());
exports.UserRoleService = UserRoleService;
//# sourceMappingURL=user-role.service.js.map