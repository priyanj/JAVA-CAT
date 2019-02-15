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
var localStorage_service_1 = require("../utility/localStorage.service");
var UserService = /** @class */ (function () {
    function UserService(http, myStorage) {
        this.http = http;
        this.myStorage = myStorage;
        this.comptransfer = new rxjs_1.BehaviorSubject("login");
        this.question = this.comptransfer.asObservable();
    }
    UserService.prototype.ngOnInit = function () {
    };
    UserService.prototype.getUsers = function () {
        return this.http.get(this.myStorage.getdomainURL() + "/user/getAll");
    };
    UserService.prototype.addUser = function (user) {
        return this.http.post(this.myStorage.getdomainURL() + "/user/create", user);
    };
    UserService.prototype.getUserByUserNamePassword = function (username, password) {
        return this.http.get(this.myStorage.getdomainURL() + "/login/" + username + "/" + password);
    };
    UserService.prototype.updateUser = function (user) {
        return this.http.put(this.myStorage.getdomainURL() + "/user/update", user);
    };
    UserService.prototype.deleteUser = function (userId) {
        return this.http.delete(this.myStorage.getdomainURL() + "/user/delete/" + userId, { responseType: 'text' });
    };
    UserService.prototype.sendMsgtoOtherComponent = function (messsage) {
        this.comptransfer.next(messsage);
    };
    UserService.prototype.sendIpAddresstoOtherComponent = function (messsage) {
        this.comptransfer.next(messsage);
    };
    UserService.prototype.countNumberOfUsers = function () {
        return this.http.get(this.myStorage.getdomainURL() + "/user/getUserCount");
    };
    UserService.prototype.changePassword = function (userName, password, newPassword) {
        return this.http.get(this.myStorage.getdomainURL() + "/user/changePassword/" + userName + "/" + password + "/" + newPassword);
    };
    UserService.prototype.getIpAddress = function () {
        var headers = new http_1.HttpHeaders({ "Access-Control-Allow-Origin": "*" });
        return this.http.get('http://ipinfo.io');
    };
    UserService.prototype.handleError = function (error) {
        console.error('observable error: ', error);
        return rxjs_1.Observable.throw(error);
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map