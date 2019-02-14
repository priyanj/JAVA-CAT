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
var currentUser_model_1 = require("../model/currentUser.model");
var LocalStorageService = /** @class */ (function () {
    function LocalStorageService(http) {
        this.http = http;
        this.user = new currentUser_model_1.currentUser();
    }
    LocalStorageService.prototype.setLoggedInTrue = function (isLoggedin) {
        localStorage.setItem('isLoggedin', isLoggedin);
    };
    LocalStorageService.prototype.setdomainURL = function () {
        localStorage.setItem('local', 'http://localhost:8090');
    };
    LocalStorageService.prototype.setClientName = function (clientName) {
        localStorage.setItem('clientName', clientName);
    };
    LocalStorageService.prototype.getClientName = function () {
        return localStorage.getItem('clientName');
    };
    LocalStorageService.prototype.getdomainURL = function () {
        return localStorage.getItem('local');
    };
    LocalStorageService.prototype.setCurrentUserObject = function (user) {
        localStorage.setItem('user', JSON.stringify(user));
    };
    LocalStorageService.prototype.getCurrentUserObject = function () {
        return JSON.parse(localStorage.getItem('user'));
    };
    LocalStorageService.prototype.setIpAddress = function (ip) {
        localStorage.setItem('ip', ip);
    };
    LocalStorageService.prototype.setComponent = function (componentName) {
        localStorage.setItem('component', componentName);
    };
    LocalStorageService.prototype.getIpAddress = function () {
        return localStorage.getItem('ip');
    };
    LocalStorageService.prototype.getLoggedInTrue = function () {
        return localStorage.getItem('isLoggedin');
    };
    LocalStorageService.prototype.clearLoggedIn = function () {
        return localStorage.removeItem('isLoggedin');
    };
    LocalStorageService.prototype.clearCurrentUser = function () {
        return localStorage.removeItem('user');
    };
    LocalStorageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], LocalStorageService);
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=localStorage.service.js.map