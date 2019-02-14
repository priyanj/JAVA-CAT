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
var rxjs_1 = require("rxjs");
var for_cloud_provider_service_1 = require("../for-cloud-provider.service");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var SetEvaluationOrderComponent = /** @class */ (function () {
    function SetEvaluationOrderComponent(forCloudProviderService, router, http) {
        this.forCloudProviderService = forCloudProviderService;
        this.router = router;
        this.http = http;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.AllData = [];
    }
    SetEvaluationOrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            responsive: true
        };
        this.forCloudProviderService.CollectData().subscribe(function (result) {
            _this.AllData = result;
            _this.dtTrigger.next();
        });
    };
    SetEvaluationOrderComponent.prototype.setEvaluationOrder = function () {
        console.log("save");
        console.log(this.AllData);
        this.forCloudProviderService.saveEvaluationOrder(this.AllData).subscribe();
    };
    SetEvaluationOrderComponent = __decorate([
        core_1.Component({
            selector: 'app-set-evaluation-order',
            templateUrl: './set-evaluation-order.component.html',
            styleUrls: ['./set-evaluation-order.component.scss']
        }),
        __metadata("design:paramtypes", [for_cloud_provider_service_1.ForCloudProviderService, router_1.Router, http_1.HttpClient])
    ], SetEvaluationOrderComponent);
    return SetEvaluationOrderComponent;
}());
exports.SetEvaluationOrderComponent = SetEvaluationOrderComponent;
//# sourceMappingURL=set-evaluation-order.component.js.map