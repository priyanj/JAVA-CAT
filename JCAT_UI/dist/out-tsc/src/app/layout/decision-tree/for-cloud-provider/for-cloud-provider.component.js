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
var for_cloud_provider_service_1 = require("./for-cloud-provider.service");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var ForCloudProviderComponent = /** @class */ (function () {
    function ForCloudProviderComponent(forCloudProviderService, router, http) {
        this.forCloudProviderService = forCloudProviderService;
        this.router = router;
        this.http = http;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.AllData = [];
    }
    ForCloudProviderComponent.prototype.ngOnInit = function () {
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
    ForCloudProviderComponent.prototype.setEvaluationOrder = function () {
        this.router.navigate(['/for-cloud-provider/app-set-evaluation-order']);
    };
    ForCloudProviderComponent.prototype.action = function (cloudProvider) {
        console.log(cloudProvider.cloudProviderId);
        this.forCloudProviderService.sendCloudProviderIdtoOtherComponent(cloudProvider.cloudProviderId);
        this.router.navigate(['/for-cloud-provider/app-cloud-provider-rule']);
        // let value : string = "AWS";
        // console.log(cloudProvider);
        // console.log(cloudProvider.cloudProviderId);
        // console.log(cloudProvider.cloudProviders);
        // let value2 : boolean = false;
        // this.forCloudProviderService.sendMsgtoOtherComponent(cloudProvider.cloudProviderId);
        // console.log(this.AllData);
        // for (let index = 0; index < this.AllData.length; index++) {
        //    if ((cloudProvider.cloudProviderId)===(this.AllData[index].cloudProviderId)) {
        //     console.log("index"+index);
        //     console.log("cloudProvider.cloudProviderId"+cloudProvider.cloudProviderId);
        //     console.log("cloudProvider.cloudProviders"+cloudProvider.cloudProviders);
        //     if('AWS'===this.AllData[index].cloudProviders)
        //     {
        //       console.log(cloudProvider.cloudProviders===this.AllData[index].cloudProviders);
        //       console.log("AWS-----"+this.AllData[index].cloudProviders);
        //       this.router.navigate(['/for-cloud-provider/app-aws']);
        //     }
        //     if('GITC'===this.AllData[index].cloudProviders)
        //     {
        //       console.log(cloudProvider.cloudProviders===this.AllData[index].cloudProviders);
        //       console.log("GITC--------"+this.AllData[index].cloudProviders);
        //       this.router.navigate(['/for-cloud-provider/app-gitc']);
        //     }
        //   }
        //  }
        //  console.log(this.AllData.length+"this.AllData.length");
    };
    ForCloudProviderComponent = __decorate([
        core_1.Component({
            selector: 'app-for-cloud-provider',
            templateUrl: './for-cloud-provider.component.html',
            styleUrls: ['./for-cloud-provider.component.scss']
        }),
        __metadata("design:paramtypes", [for_cloud_provider_service_1.ForCloudProviderService, router_1.Router, http_1.HttpClient])
    ], ForCloudProviderComponent);
    return ForCloudProviderComponent;
}());
exports.ForCloudProviderComponent = ForCloudProviderComponent;
//# sourceMappingURL=for-cloud-provider.component.js.map