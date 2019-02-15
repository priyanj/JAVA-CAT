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
var core_2 = require("@ngx-translate/core");
var router_animations_1 = require("../../../../router.animations");
var user_service_1 = require("../service/user.service");
var localStorage_service_1 = require("../utility/localStorage.service");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(translate, userService, router, myStorage) {
        this.translate = translate;
        this.userService = userService;
        this.router = router;
        this.myStorage = myStorage;
        this.isActive = false;
        this.alerts = [];
        this.sliders = [];
        this.application = [];
        this.appCount = [];
        this.userCount = [];
    }
    DashboardComponent.prototype.download = function () {
    };
    DashboardComponent.prototype.ngOnInit = function () {
        // //this.clientIdValue = this.myStorage.getCurrentUserObject().clientId;
        this.redirectToDashboard = this.myStorage.getLoggedInTrue();
        if (this.redirectToDashboard != 'true') {
            this.router.navigate(['/login']);
            this.firstName = this.myStorage.getCurrentUserObject().firstName;
            this.lastName = this.myStorage.getCurrentUserObject().lastName;
        }
    };
    DashboardComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: '../view/dashboard.component.html',
            styleUrls: ['../view/dashboard.component.scss'],
            animations: [router_animations_1.routerTransition()]
        }),
        __metadata("design:paramtypes", [core_2.TranslateService, user_service_1.UserService, router_1.Router, localStorage_service_1.LocalStorageService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map