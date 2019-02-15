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
var rxjs_1 = require("rxjs");
var router_1 = require("@angular/router");
var DTCloudableRule_1 = require("../entity/DTCloudableRule");
var dt_cloudable_rule_service_1 = require("../service/dt-cloudable-rule.service");
var localStorage_service_1 = require("../utility/localStorage.service");
var DtCloudableComponent = /** @class */ (function () {
    function DtCloudableComponent(http, dtCloudableRuleService, router, myStorage) {
        this.http = http;
        this.dtCloudableRuleService = dtCloudableRuleService;
        this.router = router;
        this.myStorage = myStorage;
        this.cloudableQuestions = [];
        this.index = 0;
        this.dtCloudableQuestionsRule = [];
        this.idvalue = false;
        this.cloudableRule = [];
        this.clickedValue = false;
        this.rule = new DTCloudableRule_1.DTCloudableRule();
        this.clickedReversedValue = false;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.rules = [];
        this.value = false;
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
    DtCloudableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dtCloudableRuleService.getAllCloudableQuestions().subscribe(function (result) { _this.cloudableQuestions = result; });
        this.dtCloudableRuleService.getCloudableRule().subscribe(function (result) { _this.cloudableRule = result, console.log(_this.cloudableRule); });
    };
    DtCloudableComponent.prototype.onClickAddrule = function (event, event1) {
        // console.log(event);
        // console.log(event1);
        // this.value=true;
        this.clickedValue = true;
        this.rule = event;
        this.eventValue = event1;
        // this.dtCloudableQuestionsRule[this.index]=event;
        // // console.log(this.dtCloudableQuestionsRule);
        // this.cloudableQuestions.splice(event1,1);
        // this.index++;
    };
    DtCloudableComponent.prototype.onClickRule = function (event2, event, event1) {
        this.clickedReversedValue = true;
        this.rule = event2;
        this.eventValue = event1;
        this.idvalue = true;
        this.id = event;
        // console.log("event");
        // console.log(event);
    };
    //   this.dtOptions  =  {
    //     pagingType:  'full_numbers',
    //     pageLength:  10,
    //     responsive:  true,
    //     rowCallback: (row: Node, data: any[] | Object, index: number) => {
    //       const self = this;
    //       $('td', row).unbind('click');
    //       $('td', row).bind('click', () => {
    //         self.someClickHandler(data);
    //       });
    //       return row;
    //     }
    //   };
    //   this.forCloudableService.collectRule(this.myStorage.getCurrentUserObject().clientId).subscribe(result => {
    //     this.rules = result;
    //   });
    //   this.forCloudableService.collectQuestion(this.myStorage.getCurrentUserObject().clientId).subscribe(result => {
    //     this.questions = result;console.log(this.questions);
    //   });
    //   this.forCloudableService.collectOptions().subscribe(result => {
    //     this.options = result;
    //   })
    // someClickHandler(info: any): void {
    //   this.message = info.id + ' - ' + info.firstName;
    // }
    // check(id:number)
    // {
    //   this.opns='';
    //  for (let index = 0; index < this.options.length; index++) {
    //   if(id==this.options[index].questionId)
    //   {
    //     this.opns = this.opns+this.options[index].optionText+',';
    //   }
    //  }
    //  this.optionsList = this.opns.slice(0, -1);
    // }
    // addCloudableRule() {
    //   for (let index = 0; index < this.rules.length; index++) {
    //     var cRule: CloudableRule = new CloudableRule();
    //     cRule.questionId = this.rules[index].questionId;
    //     cRule.cloudableRule = this.cloudableRulesText[index];
    //     cRule.executionOrder = this.executionOrders[index];
    //     cRule.questionText = this.rules[index].questionText;
    //     cRule.cloudableRuleId = this.rules[index].cloudableRuleId;
    //     this.cloudableRules[index] = cRule;
    //     this.router.navigate(['/for-cloudable']);
    //   }
    //   this.forCloudableService.addClodableRule(this.cloudableRules).subscribe();
    // }
    // onSubmit() {
    //     let cRule = new CloudableRule();
    //   this.addCloudableRule();
    // }
    // Cancle() {
    //   this.router.navigate(['/decision-tree']);
    // }
    // selectChangeHandler(event:any)
    // {
    //   if(event.target.value=="QuestionDisplayOrder")
    //   {
    //     let small : number = 0;
    //     this.rules.sort(function(displayOrder1,displayOrder2){
    //       if(displayOrder1.questionDisplayOrder>displayOrder2.questionDisplayOrder) return 1;
    //       if(displayOrder1.questionDisplayOrder<displayOrder2.questionDisplayOrder) return -1;
    //     })
    //   }
    //   else if (event.target.value == "ExecutionOrder") {
    //     this.rules.sort(function (executionOrder1, executionOrder2) {
    //       if (executionOrder1.executionOrder > executionOrder2.executionOrder) {
    //         return 1;
    //       }
    //       if (executionOrder1.executionOrder < executionOrder2.executionOrder) {
    //         return -1;
    //       }
    //     });
    //   }
    // }
    DtCloudableComponent.prototype.selectChangeHandler = function (optionObject, event, qid, qtext) {
        var flag = 0;
        // console.log()
        if (event.target.checked) {
            for (var index = 0; index < this.cloudableRule.length; index++) {
                if (this.cloudableRule[index].questionId == qid) {
                    this.cloudableRule[index].optionIds = this.cloudableRule[index].optionIds + "," + optionObject.optionId;
                    this.cloudableRule[index].optionTextsEN = this.cloudableRule[index].optionTextsEN + "," + optionObject.optionTextEN;
                    this.cloudableRule[index].modifiedBy = this.myStorage.getCurrentUserObject().username;
                    flag++;
                }
            }
            // if(flag==0){
            //   for (let index = 0; index < this.cloudableRule.length; index++) {
            //     // if(this.cloudableRule[index].migrationId==this.migrationIdValue)
            //     // {
            //     if(this.cloudableRule[index].questionId==qid)
            //     {
            //       if(this.cloudableRule[index].optionIds==0)
            //       {
            //         let cloudableRuleNewObject:DTCloudableRule = new DTCloudableRule();
            //         cloudableRuleNewObject.questionId = qid;
            //         // cloudableRuleNewObject.migrationId = this.migrationIdValue;
            //         cloudableRuleNewObject.optionTextsEN = optionObject.optionTextEN;
            //         cloudableRuleNewObject.executionOrder =0;
            //         cloudableRuleNewObject.questionTextEN = qtext;
            //         cloudableRuleNewObject.optionIds = optionObject.optionId;
            //         cloudableRuleNewObject.cloudableRuleId=this.cloudableRule[index].migrationRuleId;
            //         flag = 1;
            //       this.cloudableRule[index]=cloudableRuleNewObject;
            //       }
            //     }
            //     //  }
            //   }
            if (flag == 0) {
                // console.log(this.allMigrationRules.length);
                var cloudableRuleNewObject = new DTCloudableRule_1.DTCloudableRule();
                cloudableRuleNewObject.questionId = qid;
                // cloudableRuleNewObject.migrationId = this.migrationIdValue;
                cloudableRuleNewObject.optionTextsEN = optionObject.optionTextEN;
                cloudableRuleNewObject.executionOrder = 0;
                cloudableRuleNewObject.questionTextEN = qtext;
                cloudableRuleNewObject.optionIds = optionObject.optionId;
                cloudableRuleNewObject.createdBy = this.myStorage.getCurrentUserObject().username;
                // migrationRuleNewObject.migrationRuleId = 
                this.cloudableRule[this.cloudableRule.length] = cloudableRuleNewObject;
                // this.RuleId++;
            }
            // }
        }
        else {
            for (var index = 0; index < this.cloudableRule.length; index++) {
                // console.log("Unchecked");
                // console.log("*****"+this.cloudableRule[index].questionId+"&&&&&&&&&"+optionObject.qid);
                if (this.cloudableRule[index].questionId === qid) {
                    // console.log("Unchecked**********************");
                    // console.log("**********");
                    // this.cloudableRule.splice(index,1);
                    this.cloudableRule[index].optionIds = this.cloudableRule[index].optionIds.replace(optionObject.optionId + ",", '');
                    this.cloudableRule[index].optionIds = this.cloudableRule[index].optionIds.replace("," + optionObject.optionId, '');
                    this.cloudableRule[index].optionTextsEN = this.cloudableRule[index].optionTextsEN.replace(optionObject.optionTextEN + ",", '');
                    this.cloudableRule[index].optionTextsEN = this.cloudableRule[index].optionTextsEN.replace("," + optionObject.optionTextEN, '');
                    this.cloudableRule[index].optionIds = this.cloudableRule[index].optionIds.replace(optionObject.optionId, '');
                    this.cloudableRule[index].optionTextsEN = this.cloudableRule[index].optionTextsEN.replace(optionObject.optionTextEN, '');
                }
            }
        }
        // console.log(this.cloudableRule);
    };
    DtCloudableComponent.prototype.submit = function () {
        // console.log(this.cloudableRule);
        this.dtCloudableRuleService.saveCloudableRule(this.cloudableRule).subscribe();
    };
    DtCloudableComponent.prototype.RuleChecked = function (opnObject, qid) {
        // console.log("&&&&&&&&&");
        for (var index = 0; index < this.cloudableRule.length; index++) {
            // console.log(this.allMigrationRules[index].questionId);
            // console.log(opnObject.questionId+"   "+ this.allMigrationRules[index].questionId);
            // if(this.cloudableRule[index].migrationId==this.migrationIdValue)
            // {
            if (qid == this.cloudableRule[index].questionId) {
                //  console.log("********");
                if (this.cloudableRule[index].optionIds != null) {
                    if (this.cloudableRule[index].optionIds.includes(opnObject.optionId)) {
                        //  Console.log("&&&&&&&&&&&&");
                        // console.log(true);
                        return true;
                        // this.checked=true;
                    }
                }
            }
            // }
            //  else{
            //   console.log(true);
            //    return false;
            //  }
        }
    };
    DtCloudableComponent.prototype.clicked = function () {
        // if(this.clickedValue)
        // {
        this.value = true;
        // this.idvalue = true;
        var ins = this.dtCloudableQuestionsRule.length;
        console.log("ins" + ins);
        this.dtCloudableQuestionsRule[ins] = this.rule;
        console.log(this.dtCloudableQuestionsRule);
        this.cloudableQuestions.splice(this.eventValue, 1);
        console.log("**********");
        // console.log(this.index);
        // this.index++;
        // }
    };
    DtCloudableComponent.prototype.reverceClicked = function () {
        var x = this.cloudableQuestions.length;
        this.cloudableQuestions[x] = this.rule;
        console.log("&&&&&&&&&");
        console.log(this.cloudableQuestions);
        console.log(this.eventValue + "************");
        this.dtCloudableQuestionsRule.splice(this.eventValue, 1);
        console.log(this.dtCloudableQuestionsRule);
        // this.cloudableQuestions.splice(this.eventValue,1);
        // x++;
    };
    DtCloudableComponent = __decorate([
        core_1.Component({
            selector: 'app-dt-cloudable',
            templateUrl: '../view/dt-cloudable.html'
            // styleUrls: ['./for-cloudable.component.scss']
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, dt_cloudable_rule_service_1.DTCloudableRuleService, router_1.Router, localStorage_service_1.LocalStorageService])
    ], DtCloudableComponent);
    return DtCloudableComponent;
}());
exports.DtCloudableComponent = DtCloudableComponent;
//# sourceMappingURL=dt-cloudable.component.js.map