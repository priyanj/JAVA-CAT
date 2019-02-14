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
var for_migration_pattern_service_1 = require("./for-migration-pattern.service");
var Question_1 = require("../../assessment-questions/Question");
var ForMigrationPatternComponent = /** @class */ (function () {
    function ForMigrationPatternComponent(forMigrationPatternService, router, http) {
        this.forMigrationPatternService = forMigrationPatternService;
        this.router = router;
        this.http = http;
        this.assessmentQuestions = new Question_1.AssessmentQuestions();
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.migrationPatternData = [];
    }
    ForMigrationPatternComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            responsive: true
        };
        this.forMigrationPatternService.getAllMigrationData().subscribe(function (result) {
            _this.migrationPatternData = result;
            _this.dtTrigger.next();
            console.log(_this.migrationPatternData);
        });
    };
    ForMigrationPatternComponent.prototype.questions = function (index) {
        this.forMigrationPatternService.sendMsgtoOtherComponent(index);
        this.router.navigate(['/for-migration-pattern/migration-patterns']);
    };
    ForMigrationPatternComponent.prototype.evaluationOrder = function () {
        this.router.navigate(['/for-migration-pattern/evaluation-order']);
    };
    ForMigrationPatternComponent = __decorate([
        core_1.Component({
            selector: 'app-for-migration-pattern',
            templateUrl: './for-migration-pattern.component.html',
            styleUrls: ['./for-migration-pattern.component.scss']
        }),
        __metadata("design:paramtypes", [for_migration_pattern_service_1.ForMigrationPatternService, router_1.Router, http_1.HttpClient])
    ], ForMigrationPatternComponent);
    return ForMigrationPatternComponent;
}());
exports.ForMigrationPatternComponent = ForMigrationPatternComponent;
//# sourceMappingURL=for-migration-pattern.component.js.map