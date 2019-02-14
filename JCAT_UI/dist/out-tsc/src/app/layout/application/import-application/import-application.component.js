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
var application_service_1 = require("../application.service");
var router_1 = require("@angular/router");
var Application_1 = require("../Application");
var user_service_1 = require("../../user/user.service");
var localStorage_service_1 = require("../../utility/service/localStorage.service");
var ImportApplicationComponent = /** @class */ (function () {
    function ImportApplicationComponent(myStorage, router, applicationService, userService) {
        this.myStorage = myStorage;
        this.router = router;
        this.applicationService = applicationService;
        this.userService = userService;
        this.extCheck = false;
        this.extation = ".csv";
        this.applications = new Application_1.Application();
        this.application = new Application_1.Application();
        this.lines = [];
        this.value = [];
        this.userData = [];
        this.clientName = localStorage.getItem('clientName');
    }
    ImportApplicationComponent.prototype.ngOnInit = function () {
    };
    ImportApplicationComponent.prototype.fileChangeListener = function (event) {
        var _this = this;
        this.filename = event.target.files[0].name;
        this.link = event.target.files[0];
        this.ext = this.filename.substring(this.filename.lastIndexOf('.')).toLowerCase();
        if (this.isCSVFile(this.ext)) {
            var reader_1 = new FileReader();
            reader_1.readAsText(this.link);
            reader_1.onload = function (data) {
                var csvData = reader_1.result;
                var csvRecordsArray = csvData.split(/\r|\n|\n/);
                var headersRow = _this.getHeaderArray(csvRecordsArray);
                _this.applications = _this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
            };
        }
        else {
            alert("please enter a csv file");
        }
    };
    ImportApplicationComponent.prototype.getDataRecordsArrayFromCSVFile = function (csvRecordsArray, headerLength) {
        for (var i = 1; i < csvRecordsArray.length; i++) {
            var data = csvRecordsArray[i].split(',');
            if (data.length == headerLength) {
                var dataArr = [];
                for (var j = 0; j < headerLength; j++) {
                    dataArr.push(data[j]);
                }
                this.lines.push(dataArr);
            }
        }
        return null;
    };
    ImportApplicationComponent.prototype.getHeaderArray = function (csvRecordsArr) {
        var headers = csvRecordsArr[0].split(',');
        var headerArray = [];
        for (var j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    };
    ImportApplicationComponent.prototype.isCSVFile = function (extn) {
        this.extCheck = (extn === this.extation);
        return this.extCheck;
    };
    ImportApplicationComponent.prototype.importData = function () {
        for (var i = 0; i < this.lines.length; i++) {
            var userName = this.lines[i][2];
            this.getuserIdByName(userName);
            this.router.navigate(['/application']);
            console.log(this.value);
        }
    };
    ImportApplicationComponent.prototype.getuserIdByName = function (userName) {
        var _this = this;
        this.userService.getUserByUserName(this.myStorage.getCurrentUserObject().clientId, userName).subscribe(function (data) {
            _this.value = data, console.log(_this.value);
            for (var i = 0; i < 1; i++) {
                _this.application.applicationName = _this.lines[i][0];
                _this.application.applicationDescription = _this.lines[i][1];
                _this.application.clientId = _this.myStorage.getCurrentUserObject().clientId;
                _this.application.cloudProvider = "";
                _this.application.createdBy = _this.myStorage.getCurrentUserObject().userName;
                _this.application.createdDate = new Date();
                _this.application.isAssessment = false;
                _this.application.isDeactivate = false;
                _this.application.isDeleted = false;
                _this.application.isFinalize = 0;
                _this.application.isSaved = 0;
                _this.application.isVerified = false;
                _this.application.MigrationPattern = "";
                _this.application.modifiedBy = localStorage.getItem('clientName');
                _this.application.modifiedDateTime = new Date();
                _this.existingUser = _this.value.id;
                _this.application.userId = _this.existingUser;
                _this.application.clientId = _this.myStorage.getCurrentUserObject().clientId;
                _this.applicationService.createApplication(_this.application)
                    .subscribe();
            }
        });
        return 0;
    };
    ImportApplicationComponent = __decorate([
        core_1.Component({
            selector: 'app-import-application',
            templateUrl: './import-application.component.html',
            styleUrls: ['./import-application.component.scss']
        }),
        __metadata("design:paramtypes", [localStorage_service_1.LocalStorageService, router_1.Router, application_service_1.ApplicationService, user_service_1.UsersService])
    ], ImportApplicationComponent);
    return ImportApplicationComponent;
}());
exports.ImportApplicationComponent = ImportApplicationComponent;
//# sourceMappingURL=import-application.component.js.map