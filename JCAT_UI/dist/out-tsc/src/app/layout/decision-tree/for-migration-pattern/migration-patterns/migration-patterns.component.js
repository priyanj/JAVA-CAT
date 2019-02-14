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
var for_migration_pattern_service_1 = require("../for-migration-pattern.service");
var router_1 = require("../../../../../../node_modules/@angular/router");
var http_1 = require("@angular/common/http");
var MigrationRule_1 = require("../../../assessment-questions/MigrationRule");
var rxjs_1 = require("rxjs");
var MigrationPatternsComponent = /** @class */ (function () {
    function MigrationPatternsComponent(forMigrationPatternService, router, http) {
        this.forMigrationPatternService = forMigrationPatternService;
        this.router = router;
        this.http = http;
        this.migrationRuleObject = [];
        this.dtOptions = {};
        this.countOption = 0;
        this.dtTrigger = new rxjs_1.Subject();
        this.migrationAllData = [];
        this.migrationOption = [];
        this.migrationRule = [];
        this.executionOrderValue = [];
    }
    MigrationPatternsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            responsive: true
        };
        this.forMigrationPatternService.question.subscribe(function (data) { _this.migrationIdValue = data; });
        this.forMigrationPatternService.getMigrationQuestions(this.migrationIdValue).subscribe(function (result) {
            _this.dtTrigger.next();
            _this.migrationAllData = result;
            _this.migrationQuestionLength = _this.migrationAllData.length;
        });
    };
    MigrationPatternsComponent.prototype.migrationProviderMethod = function () {
        console.log(JSON.stringify(this.migrationAllData));
        for (var index = 0; index < this.migrationAllData.length; index++) {
            var migrationRuleNewObject = new MigrationRule_1.MigrationRule();
            migrationRuleNewObject.questionId = this.migrationAllData[index].questionId;
            migrationRuleNewObject.migrationId = this.migrationIdValue;
            migrationRuleNewObject.migrationRule = this.migrationRule[index];
            migrationRuleNewObject.executionOrder = this.executionOrderValue[index];
            migrationRuleNewObject.questionText = this.migrationAllData[index].questionText;
            for (var i = 0; i < this.migrationAllData[index].migrationRule.length; i++) {
                if (this.migrationAllData[index].migrationRule[i].migrationId === this.migrationIdValue) {
                    migrationRuleNewObject.migrationRuleId = this.migrationAllData[index].migrationRule[i].migrationRuleId;
                }
            }
            this.migrationRuleObject[index] = migrationRuleNewObject;
        }
        this.forMigrationPatternService.updateMigrationRule(this.migrationRuleObject).subscribe();
        this.router.navigate(['/for-migration-pattern']);
    };
    MigrationPatternsComponent.prototype.Cancel = function () {
        this.router.navigate(['/for-migration-pattern']);
    };
    MigrationPatternsComponent.prototype.addQuestions = function () {
        this.router.navigate(['/assessment-questions/add-assessment-question']);
    };
    MigrationPatternsComponent = __decorate([
        core_1.Component({
            selector: 'app-migration-patterns',
            templateUrl: './migration-patterns.component.html',
            styleUrls: ['./migration-patterns.component.scss']
        }),
        __metadata("design:paramtypes", [for_migration_pattern_service_1.ForMigrationPatternService, router_1.Router, http_1.HttpClient])
    ], MigrationPatternsComponent);
    return MigrationPatternsComponent;
}());
exports.MigrationPatternsComponent = MigrationPatternsComponent;
//# sourceMappingURL=migration-patterns.component.js.map