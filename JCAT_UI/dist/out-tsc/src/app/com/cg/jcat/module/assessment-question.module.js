"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular_datatables_1 = require("angular-datatables");
var forms_1 = require("@angular/forms");
var assessment_question_routing_module_1 = require("../router/assessment-question-routing.module");
var assessment_question_component_1 = require("../component/assessment-question.component");
var assessment_questions_service_1 = require("../service/assessment-questions.service");
var add_assessment_question_component_1 = require("../component/add-assessment-question.component");
var AssessmentQuestionsModule = /** @class */ (function () {
    function AssessmentQuestionsModule() {
    }
    AssessmentQuestionsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, assessment_question_routing_module_1.AssessmentQuestionsRoutingModule, angular_datatables_1.DataTablesModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: [assessment_question_component_1.AssessmentQuestionsComponent, add_assessment_question_component_1.AddAssessmentQuestionComponent],
            providers: [assessment_questions_service_1.AssessmentQuestionsService]
        })
    ], AssessmentQuestionsModule);
    return AssessmentQuestionsModule;
}());
exports.AssessmentQuestionsModule = AssessmentQuestionsModule;
//# sourceMappingURL=assessment-question.module.js.map