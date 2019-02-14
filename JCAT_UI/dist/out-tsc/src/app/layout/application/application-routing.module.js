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
var application_component_1 = require("./application.component");
var add_application_component_1 = require("./add-application/add-application.component");
var import_application_component_1 = require("./import-application/import-application.component");
var view_application_component_1 = require("./view-application/view-application.component");
var assesst_application_component_1 = require("./assesst-application/assesst-application.component");
var update_application_component_1 = require("./update-application/update-application.component");
var routes = [
    { path: '', component: application_component_1.ApplicationComponent },
    { path: 'add-application', component: add_application_component_1.AddApplicationComponent },
    { path: 'import-application', component: import_application_component_1.ImportApplicationComponent },
    { path: 'view-application', component: view_application_component_1.ViewApplicationComponent },
    { path: 'assesst-application', component: assesst_application_component_1.AssesstApplicationComponent },
    { path: 'update-application', component: update_application_component_1.UpdateApplicationComponent },
];
var ApplicationRoutingModule = /** @class */ (function () {
    function ApplicationRoutingModule() {
    }
    ApplicationRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ApplicationRoutingModule);
    return ApplicationRoutingModule;
}());
exports.ApplicationRoutingModule = ApplicationRoutingModule;
//# sourceMappingURL=application-routing.module.js.map