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
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var AssessmentQuestion_1 = require("../entity/AssessmentQuestion");
var dt_migration_rule_service_1 = require("../service/dt-migration-rule.service");
var DTMigrationPatternComponent = /** @class */ (function () {
    function DTMigrationPatternComponent(forMigrationPatternService, router, http) {
        this.forMigrationPatternService = forMigrationPatternService;
        this.router = router;
        this.http = http;
        this.assessmentQuestions = new AssessmentQuestion_1.AssessmentQuestions();
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.migrationPatternData = [];
    }
    DTMigrationPatternComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            responsive: true
        };
        this.forMigrationPatternService.getMigration().subscribe(function (result) {
            _this.migrationPatternData = result;
            _this.dtTrigger.next();
        });
    };
    DTMigrationPatternComponent.prototype.questions = function (migrationId) {
        var _this = this;
        this.forMigrationPatternService.getMigrationQuestions().subscribe(function (result) {
            _this.router.navigate(['/dt-migration-pattern/dt-migration-pattern-rule']);
        });
    };
    DTMigrationPatternComponent = __decorate([
        core_1.Component({
            selector: 'app-for-migration-pattern',
            templateUrl: '../view/dt-migration-pattern.component.html',
            styleUrls: ['../view/dt-migration-pattern.component.scss']
        }),
        __metadata("design:paramtypes", [dt_migration_rule_service_1.DTMigrationRuleService, router_1.Router, http_1.HttpClient])
    ], DTMigrationPatternComponent);
    return DTMigrationPatternComponent;
}());
exports.DTMigrationPatternComponent = DTMigrationPatternComponent;
//# sourceMappingURL=dt-migration-pattern.component.js.map