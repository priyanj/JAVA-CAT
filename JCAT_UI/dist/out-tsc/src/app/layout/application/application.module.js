"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular_datatables_1 = require("angular-datatables");
var forms_1 = require("@angular/forms");
var application_routing_module_1 = require("./application-routing.module");
var application_component_1 = require("./application.component");
var add_application_component_1 = require("./add-application/add-application.component");
var import_application_component_1 = require("./import-application/import-application.component");
var view_application_component_1 = require("./view-application/view-application.component");
var assesst_application_component_1 = require("./assesst-application/assesst-application.component");
var update_application_component_1 = require("./update-application/update-application.component");
var ngx_logger_1 = require("ngx-logger");
var application_assessment_component_1 = require("./application-assessment/application-assessment.component");
var ApplicationModule = /** @class */ (function () {
    function ApplicationModule() {
    }
    ApplicationModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, application_routing_module_1.ApplicationRoutingModule, angular_datatables_1.DataTablesModule, forms_1.FormsModule,
                ngx_logger_1.LoggerModule.forRoot({ level: ngx_logger_1.NgxLoggerLevel.LOG, disableConsoleLogging: false, serverLogLevel: ngx_logger_1.NgxLoggerLevel.LOG })],
            declarations: [
                application_component_1.ApplicationComponent,
                add_application_component_1.AddApplicationComponent,
                import_application_component_1.ImportApplicationComponent,
                view_application_component_1.ViewApplicationComponent,
                assesst_application_component_1.AssesstApplicationComponent,
                update_application_component_1.UpdateApplicationComponent,
                application_assessment_component_1.ApplicationAssessmentComponent
            ]
        })
    ], ApplicationModule);
    return ApplicationModule;
}());
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=application.module.js.map