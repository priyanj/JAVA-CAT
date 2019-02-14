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
var access_denied_routing_module_1 = require("./access-denied-routing.module");
var access_denied_component_1 = require("./access-denied.component");
var AccessDeniedModule = /** @class */ (function () {
    function AccessDeniedModule() {
    }
    AccessDeniedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                access_denied_routing_module_1.AccessDeniedRoutingModule
            ],
            declarations: [access_denied_component_1.AccessDeniedComponent]
        })
    ], AccessDeniedModule);
    return AccessDeniedModule;
}());
exports.AccessDeniedModule = AccessDeniedModule;
//# sourceMappingURL=access-denied.module.js.map