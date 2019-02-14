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
var rxjs_1 = require("rxjs");
var assesst_application_service_1 = require("./assesst-application.service");
var Answers_1 = require("./Answers");
var application_service_1 = require("../application.service");
var localStorage_service_1 = require("../../utility/service/localStorage.service");
var AssesstApplicationComponent = /** @class */ (function () {
    function AssesstApplicationComponent(myStorage, router, assessmentService, applicationService) {
        this.myStorage = myStorage;
        this.router = router;
        this.assessmentService = assessmentService;
        this.applicationService = applicationService;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.numberOfOption = [];
        this.theCheckboxOptions = [];
        this.theCheckbox = [];
        this.tempp = [];
        this.answers = [];
        this.multi = 0;
        this.single = 0;
        this.singlee = 0;
        this.result = "";
        this.queId1 = 0;
        this.i = -1;
        this.userType1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    AssesstApplicationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            responsive: true
        };
        this.clientIdValue = this.myStorage.getCurrentUserObject().clientId;
        this.applicationService.question.subscribe(function (data) {
            _this.application = data;
        });
        if (this.application.isSaved == 0) {
            this.assessmentService.CollecOptiontData(this.clientIdValue).subscribe(function (result) {
                _this.AllData = result;
                _this.dtTrigger.next();
            });
        }
        else {
            this.assessmentService.UpdateAnswers(this.application.applicationId).subscribe(function (result) {
                _this.UpdateAnswersData = result;
            });
            this.assessmentService.CollecOptiontData(this.clientIdValue).subscribe(function (result) { _this.AllData = result; });
        }
    };
    AssesstApplicationComponent.prototype.AssessApplicationRule = function () {
        console.log('rule decide');
        this.assessmentService.AllRuleCheck(this.application.applicationId).subscribe();
    };
    AssesstApplicationComponent.prototype.selectChange = function (args) {
        this.tempp[this.single] = args.target.options[args.target.selectedIndex].text;
        this.single++;
    };
    AssesstApplicationComponent.prototype.selectChangeHandler = function (optionnnnnn, event, id) {
        if (event.target.checked) {
            if (this.queId1 === id) {
                var text1 = optionnnnnn.optionText;
                var text2 = "";
                this.result = this.result + text1;
                this.theCheckbox[this.i] = this.result;
            }
            else {
                if (queId != id) {
                    this.result = "";
                }
                this.i++;
                this.result = this.result + "," + optionnnnnn.optionText;
                this.theCheckbox[this.i] = optionnnnnn.optionText;
            }
            var queId = id;
            this.queId1 = queId;
        }
        else {
        }
    };
    AssesstApplicationComponent.prototype.onSubmit = function () {
        alert("Do you want to save");
        this.application.isSaved = 1;
        this.submit();
    };
    AssesstApplicationComponent.prototype.submit = function () {
        this.application.isSaved = 1;
        for (var index = 0; index < this.AllData.length; index++) {
            var answer = new Answers_1.Answers();
            answer.applicationId = this.application.applicationId;
            answer.questionId = this.AllData[index].questionId;
            if (this.AllData[index].questionType == "Multiple Choice Multiple Answer") {
                answer.answerText = this.theCheckbox[this.multi];
                this.multi++;
            }
            else {
                answer.answerText = this.tempp[this.singlee];
                this.singlee++;
            }
            answer.cloudAbility = 0;
            this.answers[index] = answer;
            console.log(JSON.stringify(answer));
        }
        this.assessmentService.saveAssessApplication(this.answers).subscribe();
        this.userActive = localStorage.getItem('isUserActive');
        if (this.userActive == 'false') {
            this.router.navigate(['/user/user-role']);
        }
        else {
            this.router.navigate(['/application']);
        }
    };
    ;
    AssesstApplicationComponent.prototype.onSubmitUpdated = function () {
        for (var index = 0; index < this.AllData.length; index++) {
            var answer = new Answers_1.Answers();
            answer.applicationId = this.application.applicationId;
            answer.questionId = this.AllData[index].questionId;
            if (this.AllData[index].questionType == "Multiple Choice Multiple Answer") {
                answer.answerText = this.theCheckbox[this.multi];
                this.multi++;
            }
            else {
                answer.answerText = this.tempp[this.singlee];
                this.singlee++;
            }
            answer.cloudAbility = 0;
            this.answers[index] = answer;
        }
        this.assessmentService.saveAssessApplicationUpdate(this.answers).subscribe();
    };
    AssesstApplicationComponent = __decorate([
        core_1.Component({
            selector: 'app-assesst-application',
            templateUrl: './assesst-application.component.html',
            styleUrls: ['./assesst-application.component.scss']
        }),
        __metadata("design:paramtypes", [localStorage_service_1.LocalStorageService, router_1.Router, assesst_application_service_1.AssesstApplicationService, application_service_1.ApplicationService])
    ], AssesstApplicationComponent);
    return AssesstApplicationComponent;
}());
exports.AssesstApplicationComponent = AssesstApplicationComponent;
//# sourceMappingURL=assesst-application.component.js.map