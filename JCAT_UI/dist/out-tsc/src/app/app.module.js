"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var core_3 = require("videogular2/core");
var controls_1 = require("videogular2/controls");
var ngx_logger_1 = require("ngx-logger");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var shared_1 = require("./shared");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var router_1 = require("@angular/router");
exports.createTranslateLoader = function (http) {
    return new http_loader_1.TranslateHttpLoader(http, './assets/i18n/', '.json');
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpClientModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                router_1.RouterModule.forRoot([]),
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: exports.createTranslateLoader,
                        deps: [http_1.HttpClient]
                    }
                }),
                app_routing_module_1.AppRoutingModule,
                core_3.VgCoreModule,
                controls_1.VgControlsModule,
                ngx_logger_1.LoggerModule.forRoot({ level: ngx_logger_1.NgxLoggerLevel.DEBUG, serverLogLevel: ngx_logger_1.NgxLoggerLevel.OFF })
            ],
            declarations: [app_component_1.AppComponent],
            providers: [shared_1.AuthGuard],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map