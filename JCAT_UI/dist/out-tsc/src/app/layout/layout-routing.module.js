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
var layout_component_1 = require("./layout.component");
//import { LoginComponent } from '../login/login.component';
// import { AuthGuard } from './shared';
var routes = [
    {
        path: '',
        component: layout_component_1.LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'user', loadChildren: './user/user.module#UserModule' },
            { path: 'application', loadChildren: './application/application.module#ApplicationModule' },
            { path: 'assessment-questions', loadChildren: './assessment-questions/assessment-questions.module#AssessmentQuestionsModule' },
            { path: 'report', loadChildren: './report/report.module#ReportModule' },
            { path: 'for-cloud-provider', loadChildren: './decision-tree/for-cloud-provider/for-cloud-provider.module#ForCloudProviderModule' },
            { path: 'for-cloudable', loadChildren: './decision-tree/for-cloudable/for-cloudable.module#ForCloudableModule' },
            { path: 'for-migration-pattern', loadChildren: './decision-tree/for-migration-pattern/for-migration-pattern.module#ForMigrationPatternModule' },
            { path: 'reassessment', loadChildren: './decision-tree/reassessment/reassessment.module#ReassessmentModule' },
            { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackModule' },
            { path: 'help', loadChildren: './help/help.module#HelpModule' },
            { path: 'faq', loadChildren: './faq/faq.module#FaqModule' }
        ]
    }
];
var LayoutRoutingModule = /** @class */ (function () {
    function LayoutRoutingModule() {
    }
    LayoutRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], LayoutRoutingModule);
    return LayoutRoutingModule;
}());
exports.LayoutRoutingModule = LayoutRoutingModule;
//# sourceMappingURL=layout-routing.module.js.map