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
var router_1 = require("../../../../../../node_modules/@angular/router");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var dt_migration_rule_service_1 = require("../service/dt-migration-rule.service");
var localStorage_service_1 = require("../utility/localStorage.service");
var DTMigrationRule_1 = require("../entity/DTMigrationRule");
var DTMigrationPatternComponentRule = /** @class */ (function () {
    function DTMigrationPatternComponentRule(forMigrationPatternService, router, http, myStorage) {
        this.forMigrationPatternService = forMigrationPatternService;
        this.router = router;
        this.http = http;
        this.myStorage = myStorage;
        this.migrationRuleObject = [];
        this.allMigrationRules = [];
        this.dtOptions = {};
        this.countOption = 0;
        this.dtTrigger = new rxjs_1.Subject();
        this.migrationAllData = [];
        this.migrationOption = [];
        this.migrationRule = [];
        this.originalQuestions = [];
        this.rulesQuestion = [];
        this.index = 0;
        this.executionOrderValue = [];
        this.value = false;
        this.idvalue = false;
        this.RuleId = 0;
        this.checked = false;
    }
    DTMigrationPatternComponentRule.prototype.ngOnInit = function () {
        var _this = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            responsive: true
        };
        //this.forMigrationPatternService.question.subscribe(data => { this.migrationIdValue = data; });
        this.forMigrationPatternService.getMigrationQuestions().subscribe(function (result) {
            _this.dtTrigger.next();
            _this.migrationAllData = result;
            console.log(result);
            // console.log(this.migrationAllData);
            // console.log( typeof(result[0]));
            // this.rulesQuestion = 
            //set with the question on which rule is set
            //:Observable<IQuestions[]>
            _this.originalQuestions = result;
            _this.migrationQuestionLength = _this.migrationAllData.length;
        });
        //---------this.forMigrationPatternService.getAllmigrationRules().subscribe(data=>{this.allMigrationRules=data});
    };
    // migrationProviderMethod() {
    //   for (let index = 0; index < this.migrationAllData.length; index++) {
    //     var migrationRuleNewObject: MigrationRule = new MigrationRule();
    //     migrationRuleNewObject.questionId = this.migrationAllData[index].questionId;
    //     migrationRuleNewObject.migrationId = this.migrationIdValue;
    //     migrationRuleNewObject.migrationRule = this.migrationRule[index];
    //     migrationRuleNewObject.executionOrder = this.executionOrderValue[index];
    //     migrationRuleNewObject.questionText = this.migrationAllData[index].questionText;
    //     for (let i = 0; i < this.migrationAllData[index].migrationRule.length; i++) {
    //       if (this.migrationAllData[index].migrationRule[i].migrationId === this.migrationIdValue) {
    //         migrationRuleNewObject.migrationRuleId = this.migrationAllData[index].migrationRule[i].migrationRuleId;
    //       }
    //     }
    //     this.migrationRuleObject[index] = migrationRuleNewObject;
    //   }
    //   this.forMigrationPatternService.updateMigrationRule(this.migrationRuleObject).subscribe();
    //   this.router.navigate(['/for-migration-pattern']);
    // }
    DTMigrationPatternComponentRule.prototype.Cancel = function () {
        this.router.navigate(['/for-migration-pattern']);
    };
    DTMigrationPatternComponentRule.prototype.addQuestions = function () {
        this.router.navigate(['/assessment-questions/add-assessment-question']);
    };
    DTMigrationPatternComponentRule.prototype.onclickAdd = function () {
        // console.log("Hello");
    };
    DTMigrationPatternComponentRule.prototype.setClickedRow = function (event) {
        // console.log(event);
        // console.log(event);
        this.originalQuestions.splice(event, 1);
        // console.log(this.originalQuestions);
    };
    DTMigrationPatternComponentRule.prototype.onClickAddrule = function (event, event1) {
        // console.log(event);
        this.value = true;
        //   for (let index1 = 0; index1 < this.originalQuestions.length; index1++) {
        //    if(event==this.originalQuestions[index1].questionId)
        //    {
        //      console.log("*****",this.originalQuestions[index1].questionId);
        //     this.rulesQuestion[this.index]=this.originalQuestions[index1];
        //   this.originalQuestions.splice(event,1);
        //   this.index++;
        //   console.log(this.rulesQuestion);
        // }
        //   }
        this.rulesQuestion[this.index] = event;
        this.originalQuestions.splice(event1, 1);
        this.index++;
        // console.log(this.rulesQuestion);
    };
    DTMigrationPatternComponentRule.prototype.onClickRule = function (event) {
        this.idvalue = true;
        this.id = event;
        // console.log("event");
        // console.log(event);
    };
    DTMigrationPatternComponentRule.prototype.selectChangeHandler = function (optionObject, event, qid, qtext) {
        var flag = 0;
        // console.log()
        if (event.target.checked) {
            // for (let index = 0; index < this.allMigrationRules.length; index++) {
            //   if(this.allMigrationRules[index].questionId==qid)
            //   {
            //     this.allMigrationRules[index].migrationRule = this.allMigrationRules[index].migrationRule+","+optionObject.optionText;
            //    flag++;
            //   }
            // }
            // if(flag==0){
            for (var index = 0; index < this.allMigrationRules.length; index++) {
                if (this.allMigrationRules[index].migrationId == this.migrationIdValue) {
                    if (this.allMigrationRules[index].questionId == qid) {
                        if (this.allMigrationRules[index].optionId == 0) {
                            var migrationRuleNewObject = new DTMigrationRule_1.DTMigrationRule();
                            migrationRuleNewObject.questionId = qid;
                            migrationRuleNewObject.migrationId = this.migrationIdValue;
                            migrationRuleNewObject.ruleOptionTextEN = optionObject.optionText;
                            migrationRuleNewObject.executionOrder = 0;
                            migrationRuleNewObject.questiontextEN = qtext;
                            migrationRuleNewObject.ruleOptionIds = optionObject.optionId;
                            migrationRuleNewObject.migrationRuleId = this.allMigrationRules[index].migrationRuleId;
                            flag = 1;
                            this.allMigrationRules[index] = migrationRuleNewObject;
                        }
                    }
                }
            }
            if (flag == 0) {
                // console.log(this.allMigrationRules.length);
                var migrationRuleNewObject = new DTMigrationRule_1.DTMigrationRule();
                migrationRuleNewObject.questionId = qid;
                migrationRuleNewObject.migrationId = this.migrationIdValue;
                migrationRuleNewObject.ruleOptionTextEN = optionObject.optionText;
                migrationRuleNewObject.executionOrder = 0;
                migrationRuleNewObject.questiontextEN = qtext;
                migrationRuleNewObject.ruleOptionIds = optionObject.optionId;
                // migrationRuleNewObject.migrationRuleId = 
                this.allMigrationRules[this.allMigrationRules.length] = migrationRuleNewObject;
                // this.RuleId++;
            }
        }
        else {
            for (var index = 0; index < this.allMigrationRules.length; index++) {
                if (this.allMigrationRules[index].optionId === optionObject.optionId) {
                    console.log("**********");
                    this.allMigrationRules.splice(index, 1);
                    // this.allMigrationRules[x].migrationRule =  this.allMigrationRules[x].migrationRule.replace(optionObject.optionText,'');
                }
            }
        }
    };
    // migrationProviderMethod(){
    //    console.log(this.allMigrationRules);
    //   this.forMigrationPatternService.updateMigrationRule(this.allMigrationRules).subscribe();
    // }
    DTMigrationPatternComponentRule.prototype.RuleChecked = function (opnObject) {
        // console.log("&&&&&&&&&");
        for (var index = 0; index < this.allMigrationRules.length; index++) {
            // console.log(this.allMigrationRules[index].questionId);
            // console.log(opnObject.questionId+"   "+ this.allMigrationRules[index].questionId);
            if (this.allMigrationRules[index].migrationId == this.migrationIdValue) {
                if (opnObject.questionId == this.allMigrationRules[index].questionId) {
                    //  console.log("********");
                    if (opnObject.optionId == this.allMigrationRules[index].optionId) {
                        //  Console.log("&&&&&&&&&&&&");
                        // console.log(true);
                        return true;
                        // this.checked=true;
                    }
                }
            }
            //  else{
            //   console.log(true);
            //    return false;
            //  }
        }
    };
    DTMigrationPatternComponentRule = __decorate([
        core_1.Component({
            selector: 'app-migration-patterns',
            templateUrl: '../view/dt-migration-pattern-rule.component.html',
            styleUrls: ['../view/dt-migration-pattern-rule.component.scss']
        }),
        __metadata("design:paramtypes", [dt_migration_rule_service_1.DTMigrationRuleService, router_1.Router, http_1.HttpClient, localStorage_service_1.LocalStorageService])
    ], DTMigrationPatternComponentRule);
    return DTMigrationPatternComponentRule;
}());
exports.DTMigrationPatternComponentRule = DTMigrationPatternComponentRule;
//# sourceMappingURL=dt-migration-pattern-rule.component.js.map