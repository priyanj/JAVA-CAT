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
var dt_cloudable_component_1 = require("../component/dt-cloudable.component");
var dt_cloudable_routing_module_1 = require("../router/dt-cloudable-routing.module");
var DtCloudableModule = /** @class */ (function () {
    function DtCloudableModule() {
    }
    DtCloudableModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, angular_datatables_1.DataTablesModule, dt_cloudable_routing_module_1.DtCloudableRoutingModule],
            declarations: [dt_cloudable_component_1.DtCloudableComponent]
        })
    ], DtCloudableModule);
    return DtCloudableModule;
}());
exports.DtCloudableModule = DtCloudableModule;
//# sourceMappingURL=dt-cloudable.module.js.map