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
var angular_datatables_1 = require("angular-datatables");
var for_migration_pattern_routing_module_1 = require("./for-migration-pattern-routing.module");
var for_migration_pattern_component_1 = require("./for-migration-pattern.component");
var evaluation_order_component_1 = require("./evaluation-order/evaluation-order.component");
var migration_patterns_component_1 = require("./migration-patterns/migration-patterns.component");
var ForMigrationPatternModule = /** @class */ (function () {
    function ForMigrationPatternModule() {
    }
    ForMigrationPatternModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, for_migration_pattern_routing_module_1.ForMigrationPatternRoutingModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, angular_datatables_1.DataTablesModule],
            declarations: [for_migration_pattern_component_1.ForMigrationPatternComponent, evaluation_order_component_1.EvaluationOrderComponent, migration_patterns_component_1.MigrationPatternsComponent]
        })
    ], ForMigrationPatternModule);
    return ForMigrationPatternModule;
}());
exports.ForMigrationPatternModule = ForMigrationPatternModule;
//# sourceMappingURL=for-migration-pattern.module.js.map