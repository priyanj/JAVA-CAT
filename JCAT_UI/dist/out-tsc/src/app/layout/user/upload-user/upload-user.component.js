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
var Users_1 = require("../Users");
var user_service_1 = require("../user.service");
var router_1 = require("@angular/router");
var localStorage_service_1 = require("../../utility/service/localStorage.service");
var UploadUserComponent = /** @class */ (function () {
    function UploadUserComponent(userservice, router, myStorage) {
        this.userservice = userservice;
        this.router = router;
        this.myStorage = myStorage;
        this.extCheck = false;
        this.extation = ".csv";
        this.userDetails = new Users_1.Users();
        this.userDetail = new Users_1.Users();
        this.lines = [];
    }
    UploadUserComponent.prototype.fileChangeListener = function (event) {
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
                _this.userDetails = _this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
            };
        }
        else {
            alert("please enter a csv file");
        }
    };
    UploadUserComponent.prototype.getDataRecordsArrayFromCSVFile = function (csvRecordsArray, headerLength) {
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
    UploadUserComponent.prototype.getHeaderArray = function (csvRecordsArr) {
        var headers = csvRecordsArr[0].split(',');
        var headerArray = [];
        for (var j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    };
    UploadUserComponent.prototype.isCSVFile = function (extn) {
        this.extCheck = (extn === this.extation);
        return this.extCheck;
    };
    UploadUserComponent.prototype.importData = function () {
        for (var i = 0; i < this.lines.length; i++) {
            this.userDetail.userName = this.lines[i][0];
            this.userDetail.firstName = this.lines[i][1];
            this.userDetail.lastName = this.lines[i][2];
            this.userDetail.company = this.lines[i][3];
            this.userDetail.password = 'Cg@123';
            this.userDetail.ipAddress = this.ipAddress;
            this.userDetail.clientId = this.myStorage.getCurrentUserObject().clientId;
            this.userDetail.createdBy = this.myStorage.getCurrentUserObject().createdBy;
            this.userDetail.createdDateTime = new Date();
            this.userDetail.isAdmin = this.lines[i][4];
            this.userDetail.isDeactivate = false;
            this.userDetail.isDeleted = 0;
            this.userDetail.lastLogin = 0;
            this.userDetail.modifiedBy = this.myStorage.getCurrentUserObject().modifiedBy;
            this.userDetail.modifiedDateTime = new Date();
            this.userservice.addUser(this.userDetail).subscribe();
            this.router.navigate(['/user']);
        }
    };
    UploadUserComponent.prototype.cancel = function () {
        this.router.navigate(['/user']);
    };
    UploadUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userservice.users.subscribe(function (data) { _this.ipAddress = data; });
    };
    UploadUserComponent = __decorate([
        core_1.Component({
            selector: 'app-upload-user',
            templateUrl: './upload-user.component.html',
            styleUrls: ['./upload-user.component.scss']
        }),
        __metadata("design:paramtypes", [user_service_1.UsersService, router_1.Router, localStorage_service_1.LocalStorageService])
    ], UploadUserComponent);
    return UploadUserComponent;
}());
exports.UploadUserComponent = UploadUserComponent;
//# sourceMappingURL=upload-user.component.js.map