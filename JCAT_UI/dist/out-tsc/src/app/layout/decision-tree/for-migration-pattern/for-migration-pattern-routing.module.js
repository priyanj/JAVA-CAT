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
var for_migration_pattern_component_1 = require("./for-migration-pattern.component");
var evaluation_order_component_1 = require("./evaluation-order/evaluation-order.component");
var migration_patterns_component_1 = require("./migration-patterns/migration-patterns.component");
var routes = [
    {
        path: '',
        component: for_migration_pattern_component_1.ForMigrationPatternComponent
    },
    { path: 'evaluation-order', component: evaluation_order_component_1.EvaluationOrderComponent },
    { path: 'migration-patterns', component: migration_patterns_component_1.MigrationPatternsComponent }
];
var ForMigrationPatternRoutingModule = /** @class */ (function () {
    function ForMigrationPatternRoutingModule() {
    }
    ForMigrationPatternRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ForMigrationPatternRoutingModule);
    return ForMigrationPatternRoutingModule;
}());
exports.ForMigrationPatternRoutingModule = ForMigrationPatternRoutingModule;
//# sourceMappingURL=for-migration-pattern-routing.module.js.map