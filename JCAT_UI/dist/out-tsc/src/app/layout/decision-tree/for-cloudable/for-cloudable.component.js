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
var http_1 = require("@angular/common/http");
var for_cloudable_service_1 = require("./for-cloudable.service");
var rxjs_1 = require("rxjs");
var router_1 = require("@angular/router");
var CloudableRule_1 = require("./CloudableRule");
var localStorage_service_1 = require("../../utility/service/localStorage.service");
var DataTablesResponse = /** @class */ (function () {
    function DataTablesResponse() {
    }
    return DataTablesResponse;
}());
var ForCloudableComponent = /** @class */ (function () {
    function ForCloudableComponent(http, forCloudableService, router, myStorage) {
        this.http = http;
        this.forCloudableService = forCloudableService;
        this.router = router;
        this.myStorage = myStorage;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.rules = [];
        this.options = [];
        this.optionValues = [];
        this.questions = [];
        this.message = '';
        this.executionOrders = [];
        this.cloudableRulesText = [];
        this.cloudableRules = [];
        this.orderByQuestionDisplayOrder = [];
        this.optionComma = false;
        this.cloudableQuestionsRules = [];
        this.exeorder = [];
        this.cloudableRules = [];
    }
    ForCloudableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            responsive: true,
            rowCallback: function (row, data, index) {
                var self = _this;
                $('td', row).unbind('click');
                $('td', row).bind('click', function () {
                    self.someClickHandler(data);
                });
                return row;
            }
        };
        this.forCloudableService.collectRule(this.myStorage.getCurrentUserObject().clientId).subscribe(function (result) {
            _this.rules = result;
        });
        this.forCloudableService.collectQuestion(this.myStorage.getCurrentUserObject().clientId).subscribe(function (result) {
            _this.questions = result;
        });
        this.forCloudableService.collectOptions().subscribe(function (result) {
            _this.options = result;
        });
        this.forCloudableService.collectQuestion(this.myStorage.getCurrentUserObject().clientId).subscribe(function (result) {
            _this.questions = result;
        });
        this.forCloudableService.collectOptions().subscribe(function (result) {
            _this.options = result;
        });
    };
    ForCloudableComponent.prototype.someClickHandler = function (info) {
        this.message = info.id + ' - ' + info.firstName;
    };
    ForCloudableComponent.prototype.check = function (id) {
        this.opns = '';
        for (var index = 0; index < this.options.length; index++) {
            if (id == this.options[index].questionId) {
                this.opns = this.opns + this.options[index].optionText + ',';
            }
        }
        this.optionsList = this.opns.slice(0, -1);
    };
    ForCloudableComponent.prototype.addCloudableRule = function () {
        for (var index = 0; index < this.rules.length; index++) {
            var cRule = new CloudableRule_1.CloudableRule();
            cRule.questionId = this.rules[index].questionId;
            cRule.cloudableRule = this.cloudableRulesText[index];
            cRule.executionOrder = this.executionOrders[index];
            cRule.questionText = this.rules[index].questionText;
            cRule.cloudableRuleId = this.rules[index].cloudableRuleId;
            this.cloudableRules[index] = cRule;
            this.router.navigate(['/for-cloudable']);
        }
        this.forCloudableService.addClodableRule(this.cloudableRules).subscribe();
    };
    ForCloudableComponent.prototype.onSubmit = function () {
        var cRule = new CloudableRule_1.CloudableRule();
        this.addCloudableRule();
    };
    ForCloudableComponent.prototype.Cancle = function () {
        this.router.navigate(['/decision-tree']);
    };
    ForCloudableComponent.prototype.selectChangeHandler = function (event) {
        if (event.target.value == "QuestionDisplayOrder") {
            var small = 0;
            this.rules.sort(function (displayOrder1, displayOrder2) {
                if (displayOrder1.questionDisplayOrder > displayOrder2.questionDisplayOrder)
                    return 1;
                if (displayOrder1.questionDisplayOrder < displayOrder2.questionDisplayOrder)
                    return -1;
            });
        }
        else if (event.target.value == "ExecutionOrder") {
            this.rules.sort(function (executionOrder1, executionOrder2) {
                if (executionOrder1.executionOrder > executionOrder2.executionOrder) {
                    return 1;
                }
                if (executionOrder1.executionOrder < executionOrder2.executionOrder) {
                    return -1;
                }
            });
        }
    };
    ForCloudableComponent = __decorate([
        core_1.Component({
            selector: 'app-for-cloudable',
            templateUrl: './for-cloudable.component.html',
            styleUrls: ['./for-cloudable.component.scss']
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, for_cloudable_service_1.ForCloudableService, router_1.Router, localStorage_service_1.LocalStorageService])
    ], ForCloudableComponent);
    return ForCloudableComponent;
}());
exports.ForCloudableComponent = ForCloudableComponent;
//# sourceMappingURL=for-cloudable.component.js.map