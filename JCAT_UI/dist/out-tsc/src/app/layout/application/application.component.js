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
var router_1 = require("@angular/router");
var rxjs_1 = require("../../../../node_modules/rxjs");
var application_service_1 = require("./application.service");
var Angular5_csv_1 = require("angular5-csv/Angular5-csv");
var ngx_logger_1 = require("ngx-logger");
var localStorage_service_1 = require("../utility/service/localStorage.service");
var DataTablesResponse = /** @class */ (function () {
    function DataTablesResponse() {
    }
    return DataTablesResponse;
}());
var ApplicationComponent = /** @class */ (function () {
    function ApplicationComponent(router, applicationService, logger, myStorage) {
        this.router = router;
        this.applicationService = applicationService;
        this.logger = logger;
        this.myStorage = myStorage;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.message = '';
        this.application = [];
        this.applicationTemplate = [];
        this.applicationList = [];
        this.show = false;
        this.buttonName = 'Help';
    }
    ApplicationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.clientIdValue = this.myStorage.getCurrentUserObject().clientId;
        this.logger.debug('************8Your log message goes here');
        this.logger.log('Your log message goes here');
        this.dtOptions = {
            pagingType: 'first_last_numbers',
            pageLength: 10,
            responsive: true,
        };
        this.applicationService.getAllAplication(this.clientIdValue).subscribe(function (result) {
            _this.applicationList = result;
            _this.logger.log(JSON.stringify(_this.applicationList));
            _this.dtTrigger.next();
        });
    };
    ApplicationComponent.prototype.toggle = function () {
        this.show = !this.show;
        if (this.show)
            this.buttonName = "Hide";
        else
            this.buttonName = "Help";
    };
    ApplicationComponent.prototype.exportTemplate = function () {
        var csvRows = [];
        this.logger.log(this.applicationList);
        var filename = "Application";
        var dateNow = new Date();
        var options = {
            headers: ["Application Name", "Application Description", "UserId"]
        };
        new Angular5_csv_1.Angular5Csv(this.applicationTemplate, filename, options);
    };
    ApplicationComponent.prototype.form = function () {
        this.router.navigate(['/application/add-application']);
    };
    ApplicationComponent.prototype.someClickHandler = function (info) {
        this.message = info.id + ' - ' + info.firstName;
    };
    ApplicationComponent.prototype.myFunction = function () {
        this.router.navigate(['/application/import-application']);
    };
    ApplicationComponent.prototype.editApplication = function (application) {
        this.logger.log(JSON.stringify(application));
        this.applicationService.sendMsgtoOtherComponent(application);
        this.router.navigate(['/application/update-application']);
    };
    ApplicationComponent.prototype.exportCsv = function () {
        var csvRows = [];
        this.logger.log(this.applicationList);
        var filename = "Application";
        var dateNow = new Date();
        this.logger.log(dateNow.getDate().toString + " Date");
        this.logger.log(dateNow.getDay().toString + " day");
        this.logger.log(dateNow.getMonth().toString + " month");
        this.logger.log(dateNow.getFullYear().toString + " year");
        for (var index = 0; index < this.applicationList.length; index++) {
            this.logger.log(this.applicationList[index].applicationId + "id");
            this.application[index] = this.applicationList[index];
        }
        this.logger.log(this.application);
        var options = {
            headers: ["ApplicationId", "Application Name", "Application Description", "IsCloudable", "MigrationPattern",
                "CloudProvider", "IsAssessment", "IsFinalized", "IsDeleted", "IsDeactivated", "DeleteDateAndTime",
                "Isverified", "CreatedDate", "ModifiedDateTime", "CreatedBy", "ModifiedBy", "UserId", "IsSaved"]
        };
        new Angular5_csv_1.Angular5Csv(this.application, filename, options);
    };
    ApplicationComponent.prototype.deleteApplication = function (formvalues) {
        var _this = this;
        this.applicationService.deleteApplications(formvalues)
            .subscribe(function (data) {
            _this.logger.log(data);
            _this.reloadData();
        }, function (error) { return console.log('ERROR: ' + error); });
    };
    ApplicationComponent.prototype.resetApplication = function (formvalues) {
        this.applicationService.resetApplication(formvalues)
            .subscribe();
    };
    ApplicationComponent.prototype.reloadData = function () {
        this.applicationService.getAllAplication(this.clientIdValue);
    };
    ApplicationComponent.prototype.ViewApplication = function (formvalues) {
        this.applicationService.sendMsgtoOtherComponent(formvalues);
        this.logger.log(formvalues);
        this.router.navigate(['/application/view-application']);
    };
    ApplicationComponent.prototype.assessApplication = function (formvalues) {
        this.logger.log(JSON.stringify(formvalues));
        this.logger.log(formvalues.applicationId);
        this.applicationService.sendMsgtoOtherComponent(formvalues);
        this.router.navigate(['/application/assesst-application']);
    };
    ApplicationComponent.prototype.deactivate = function (formvalues) {
        this.applicationService.deactivate(formvalues).subscribe();
    };
    ApplicationComponent = __decorate([
        core_1.Component({
            selector: 'app-application',
            templateUrl: './application.component.html',
            styleUrls: ['./application.component.scss'],
            providers: [ngx_logger_1.NGXLogger]
        }),
        __metadata("design:paramtypes", [router_1.Router, application_service_1.ApplicationService, ngx_logger_1.NGXLogger, localStorage_service_1.LocalStorageService])
    ], ApplicationComponent);
    return ApplicationComponent;
}());
exports.ApplicationComponent = ApplicationComponent;
//# sourceMappingURL=application.component.js.map