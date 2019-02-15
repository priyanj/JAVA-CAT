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
var dt_migration_pattern_routing_module_1 = require("../router/dt-migration-pattern-routing.module");
var dt_migration_pattern_component_1 = require("../component/dt-migration-pattern.component");
var dt_migration_pattern_rule_component_1 = require("../component/dt-migration-pattern-rule.component");
var DTMigrationPatternModule = /** @class */ (function () {
    function DTMigrationPatternModule() {
    }
    DTMigrationPatternModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, dt_migration_pattern_routing_module_1.DTMigrationPatternRoutingModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, angular_datatables_1.DataTablesModule],
            declarations: [dt_migration_pattern_component_1.DTMigrationPatternComponent, dt_migration_pattern_rule_component_1.DTMigrationPatternComponentRule]
        })
    ], DTMigrationPatternModule);
    return DTMigrationPatternModule;
}());
exports.DTMigrationPatternModule = DTMigrationPatternModule;
//# sourceMappingURL=dt-migration-pattern.module.js.map