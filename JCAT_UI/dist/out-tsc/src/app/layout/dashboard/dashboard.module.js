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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var dashboard_routing_module_1 = require("./dashboard-routing.module");
var dashboard_component_1 = require("./dashboard.component");
var ngx_youtube_player_1 = require("ngx-youtube-player");
var core_2 = require("videogular2/core");
var controls_1 = require("videogular2/controls");
var shared_1 = require("../../shared");
var core_3 = require("@ngx-translate/core");
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                ng_bootstrap_1.NgbCarouselModule.forRoot(),
                ng_bootstrap_1.NgbAlertModule.forRoot(),
                core_3.TranslateModule.forChild(),
                dashboard_routing_module_1.DashboardRoutingModule,
                shared_1.StatModule,
                ngx_youtube_player_1.YoutubePlayerModule,
                core_2.VgCoreModule,
                controls_1.VgControlsModule
            ],
            declarations: [
                dashboard_component_1.DashboardComponent
            ]
        })
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map