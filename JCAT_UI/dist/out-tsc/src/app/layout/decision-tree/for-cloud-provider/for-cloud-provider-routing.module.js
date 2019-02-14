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
var for_cloud_provider_component_1 = require("./for-cloud-provider.component");
var set_evaluation_order_component_1 = require("./set-evaluation-order/set-evaluation-order.component");
var cloud_provider_rule_component_1 = require("./cloud-provider-rule/cloud-provider-rule.component");
var routes = [
    {
        path: '',
        component: for_cloud_provider_component_1.ForCloudProviderComponent
    },
    {
        path: 'app-set-evaluation-order', component: set_evaluation_order_component_1.SetEvaluationOrderComponent
    },
    {
        path: 'app-cloud-provider-rule', component: cloud_provider_rule_component_1.CloudProviderRuleComponent
    }
];
var ForCloudProviderRoutingModule = /** @class */ (function () {
    function ForCloudProviderRoutingModule() {
    }
    ForCloudProviderRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ForCloudProviderRoutingModule);
    return ForCloudProviderRoutingModule;
}());
exports.ForCloudProviderRoutingModule = ForCloudProviderRoutingModule;
//# sourceMappingURL=for-cloud-provider-routing.module.js.map