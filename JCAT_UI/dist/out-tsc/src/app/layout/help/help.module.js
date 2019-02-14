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
var forms_1 = require("@angular/forms");
var help_routing_module_1 = require("./help-routing.module");
var help_component_1 = require("./help.component");
var ngx_youtube_player_1 = require("ngx-youtube-player");
var HelpModule = /** @class */ (function () {
    function HelpModule() {
    }
    HelpModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                help_routing_module_1.HelpRoutingModule,
                ngx_youtube_player_1.YoutubePlayerModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [help_component_1.HelpComponent]
        })
    ], HelpModule);
    return HelpModule;
}());
exports.HelpModule = HelpModule;
//# sourceMappingURL=help.module.js.map