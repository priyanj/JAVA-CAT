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
var router_animations_1 = require("../router.animations");
var login_service_1 = require("./login.service");
var Users_1 = require("./Users");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(loginService, router, loginservice) {
        this.loginService = loginService;
        this.router = router;
        this.loginservice = loginservice;
        this.users = new Users_1.Users();
    }
    LoginComponent.prototype.ngOnInit = function () {
        localStorage.setItem('userName', null);
    };
    LoginComponent.prototype.onLoggedin = function (formValues) {
        var _this = this;
        //  localStorage.setItem('isLoggedin', 'true');   
        this.loginservice.getUserByUserNamePassword(formValues.userName, formValues.password).subscribe(function (data) {
            _this.users = data;
            //  console.log('****************************************'+this.users.password);
            console.log(_this.users + "asdasdasd");
            if (_this.users != null) {
                localStorage.setItem('isLoggedin', 'true');
                if (_this.users.isAdmin === 0) {
                    localStorage.setItem('isUserActive', 'true');
                    localStorage.setItem('clientName', _this.users.clientName);
                    console.log("client name==" + _this.users.clientName);
                    console.log("is adminnnnnnnnnnn" + _this.users.isAdmin);
                    localStorage.setItem('firstName', _this.users.firstName);
                    localStorage.setItem('lastName', _this.users.lastName);
                    _this.message = "uuuu";
                    localStorage.setItem('userName', formValues.userName);
                    _this.loginService.sendMsgtoOtherComponent(_this.users);
                    _this.router.navigate(['/dashboard']);
                }
                else if (_this.users.isAdmin == 1) {
                    localStorage.setItem('isUserActive', 'false');
                    localStorage.setItem('clientName', _this.users.clientName);
                    console.log("client name==" + _this.users.clientName);
                    console.log(JSON.stringify(_this.users));
                    _this.loginService.sendMsgtoOtherComponent(_this.users.userId);
                    localStorage.setItem('firstName', _this.users.firstName);
                    localStorage.setItem('lastName', _this.users.lastName);
                    localStorage.setItem('userName', formValues.userName);
                    _this.loginService.sendMsgtoOtherComponent(_this.users);
                    _this.router.navigate(['/dashboard']);
                }
            }
            else {
                alert("Please enter correct username and Password");
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss'],
            animations: [router_animations_1.routerTransition()]
        }),
        __metadata("design:paramtypes", [login_service_1.LoginService, router_1.Router, login_service_1.LoginService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map