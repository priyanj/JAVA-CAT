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
var dt_migration_pattern_component_1 = require("../component/dt-migration-pattern.component");
var dt_migration_pattern_rule_component_1 = require("../component/dt-migration-pattern-rule.component");
var routes = [
    {
        path: '',
        component: dt_migration_pattern_component_1.DTMigrationPatternComponent
    },
    { path: 'dt-migration-pattern-rule', component: dt_migration_pattern_rule_component_1.DTMigrationPatternComponentRule },
];
var DTMigrationPatternRoutingModule = /** @class */ (function () {
    function DTMigrationPatternRoutingModule() {
    }
    DTMigrationPatternRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], DTMigrationPatternRoutingModule);
    return DTMigrationPatternRoutingModule;
}());
exports.DTMigrationPatternRoutingModule = DTMigrationPatternRoutingModule;
//# sourceMappingURL=dt-migration-pattern-routing.module.js.map