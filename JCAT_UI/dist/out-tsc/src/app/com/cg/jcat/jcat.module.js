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
var core_2 = require("@ngx-translate/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var jcat_routing_module_1 = require("./jcat-routing.module");
var jcat_component_1 = require("./jcat.component");
var sidebar_component_1 = require("./component/sidebar.component");
var header_component_1 = require("./component/header.component");
var footer_component_1 = require("./component/footer.component");
var JcatModule = /** @class */ (function () {
    function JcatModule() {
    }
    JcatModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                jcat_routing_module_1.JcatRoutingModule,
                core_2.TranslateModule,
                ng_bootstrap_1.NgbDropdownModule,
                forms_1.FormsModule
            ],
            declarations: [jcat_component_1.JcatComponent, sidebar_component_1.SidebarComponent, header_component_1.HeaderComponent, footer_component_1.FooterComponent]
        })
    ], JcatModule);
    return JcatModule;
}());
exports.JcatModule = JcatModule;
//# sourceMappingURL=jcat.module.js.map