"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var jcat_component_1 = require("./jcat.component");
var routes = [
    {
        path: '',
        component: jcat_component_1.JcatComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'user', loadChildren: './module/user.module#UserModule' },
            { path: 'application', loadChildren: './module/application.module#ApplicationModule' },
            { path: 'dashboard', loadChildren: './module/dashboard.module#DashboardModule' },
            { path: 'assessment-questions', loadChildren: './module/assessment-question.module#AssessmentQuestionsModule' },
            { path: 'dt-cloudable', loadChildren: './module/dt-cloudable.module#DtCloudableModule' },
        ]
    }
];
var JcatRoutingModule = /** @class */ (function () {
    function JcatRoutingModule() {
    }
    JcatRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], JcatRoutingModule);
    return JcatRoutingModule;
}());
exports.JcatRoutingModule = JcatRoutingModule;
//# sourceMappingURL=jcat-routing.module.js.map