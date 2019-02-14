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
var localStorage_service_1 = require("../utility/service/localStorage.service");
var UsersService = /** @class */ (function () {
    function UsersService(http, myStorage) {
        this.http = http;
        this.myStorage = myStorage;
        this.comptransfer = new rxjs_1.BehaviorSubject("user data by default");
        this.users = this.comptransfer.asObservable();
    }
    UsersService.prototype.getAllUsers = function (clientId) {
        return this.http.get(this.myStorage.getdomainURL() + "/user/getAll/" + clientId);
    };
    UsersService.prototype.getUsersCount = function (clientId) {
        return this.http.get(this.myStorage.getdomainURL() + "/user/getTotalUsersCount/" + clientId);
    };
    UsersService.prototype.getUserByUserName = function (clientId, userName) {
        return this.http.get(this.myStorage.getdomainURL() + '/user/getUserId/' + clientId + '/' + userName);
    };
    UsersService.prototype.countNumberOfUsers = function () {
        return this.http.get(this.myStorage.getdomainURL() + "/user/getUserCount");
    };
    UsersService.prototype.addUser = function (user) {
        return this.http.post(this.myStorage.getdomainURL() + "/user/addUser/create/" + this.myStorage.getCurrentUserObject().userName, user);
    };
    UsersService.prototype.deactivate = function (userId) {
        return this.http.put(this.myStorage.getdomainURL() + "/user/deactivateUser/" + userId, { responseType: 'text' });
    };
    UsersService.prototype.changePassword = function (userName, password, newPassword) {
        return this.http.get(this.myStorage.getdomainURL() + "/user/changePassword/" + userName + "/" + password + "/" + newPassword);
    };
    UsersService.prototype.sendUsertoOtherComponent = function (messsage) {
        this.comptransfer.next(messsage);
    };
    UsersService.prototype.sendMsgtoOtherComponent = function (messsage) {
        this.comptransfer.next(messsage);
    };
    UsersService.prototype.sendIpAddresstoOtherComponent = function (messsage) {
        this.comptransfer.next(messsage);
    };
    UsersService.prototype.updateUser = function (user) {
        return this.http.put(this.myStorage.getdomainURL() + "/user/updateUser/update/" + this.myStorage.getCurrentUserObject().userName, user);
    };
    UsersService.prototype.deleteUser = function (userId) {
        return this.http.delete(this.myStorage.getdomainURL() + "/user/deleteUserById/" + this.myStorage.getCurrentUserObject().clientId + "/" + userId, { responseType: 'text' });
    };
    UsersService.prototype.getIpAddress = function () {
        var headers = new http_1.HttpHeaders({ "Access-Control-Allow-Origin": "*" });
        return this.http.get('http://ipinfo.io');
    };
    UsersService.prototype.handleError = function (error) {
        console.error('observable error: ', error);
        return rxjs_1.Observable.throw(error);
    };
    UsersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=user.service.js.map