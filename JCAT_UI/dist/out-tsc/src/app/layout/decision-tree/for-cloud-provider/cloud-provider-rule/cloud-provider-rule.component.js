"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var for_cloud_provider_service_1 = require("../for-cloud-provider.service");
var CloudProviderRule_1 = require("../CloudProviderRule");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var CloudProviderRuleComponent = /** @class */ (function () {
    function CloudProviderRuleComponent(forCloudProviderService, router) {
        this.forCloudProviderService = forCloudProviderService;
        this.router = router;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.executionOrders = [];
        this.cloudProviderRulesText = [];
        this.cloudProviderRule = [];
    }
    CloudProviderRuleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            responsive: true
        };
        this.forCloudProviderService.cloudProviderId.subscribe(function (data) { _this.cloudproviderId = data; });
        this.forCloudProviderService.CollectCloudableRuleQuestions(this.cloudproviderId).subscribe(function (result) {
            _this.CloudProviderAllData = result;
            _this.dtTrigger.next();
        });
    };
    CloudProviderRuleComponent.prototype.onSubmit = function () {
        this.addCloudeProviderRule();
    };
    CloudProviderRuleComponent.prototype.addCloudeProviderRule = function () {
        for (var index = 0; index < this.CloudProviderAllData.length; index++) {
            var cloudproRules = new CloudProviderRule_1.CloudProviderRule();
            cloudproRules.questionId = this.CloudProviderAllData[index].questionId;
            cloudproRules.cloudProviderId = this.cloudproviderId;
            cloudproRules.cloudProviderRule = this.cloudProviderRulesText[index];
            cloudproRules.executionOrder = this.executionOrders[index];
            cloudproRules.questionText = this.CloudProviderAllData[index].questionText;
            for (var index1 = 0; index1 < this.CloudProviderAllData[index].cloudProviderRules.length; index1++) {
                if (this.CloudProviderAllData[index].cloudProviderRules[index1].cloudProviderId === this.cloudproviderId) {
                    cloudproRules.cloudProviderRuleId = this.CloudProviderAllData[index].cloudProviderRules[index1].cloudProviderRuleId;
                }
            }
            this.cloudProviderRule[index] = cloudproRules;
        }
        console.log(JSON.stringify(this.cloudProviderRule));
        this.forCloudProviderService.updateCloudProviderRule(this.cloudProviderRule).subscribe();
        this.router.navigate(['/for-cloud-provider']);
    };
    CloudProviderRuleComponent.prototype.Cancel = function () {
        this.router.navigate(['/for-cloud-provider']);
    };
    CloudProviderRuleComponent.prototype.addQuestion = function () {
        this.router.navigate(['/assessment-questions/add-assessment-question']);
    };
    CloudProviderRuleComponent = __decorate([
        core_1.Component({
            selector: 'app-cloud-provider-rule',
            templateUrl: './cloud-provider-rule.component.html',
            styleUrls: ['./cloud-provider-rule.component.scss']
        }),
        __metadata("design:paramtypes", [for_cloud_provider_service_1.ForCloudProviderService, router_1.Router])
    ], CloudProviderRuleComponent);
    return CloudProviderRuleComponent;
}());
exports.CloudProviderRuleComponent = CloudProviderRuleComponent;
//# sourceMappingURL=cloud-provider-rule.component.js.map