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
var assessment_questions_routing_module_1 = require("./assessment-questions-routing.module");
var assessment_questions_component_1 = require("./assessment-questions.component");
var assessment_questions_service_1 = require("./assessment-questions.service");
var import_question_component_1 = require("./import-question/import-question.component");
var add_assessment_question_component_1 = require("./add-assessment-question/add-assessment-question.component");
var update_question_component_1 = require("./update-question/update-question.component");
var AssessmentQuestionsModule = /** @class */ (function () {
    function AssessmentQuestionsModule() {
    }
    AssessmentQuestionsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, assessment_questions_routing_module_1.AssessmentQuestionsRoutingModule, angular_datatables_1.DataTablesModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: [assessment_questions_component_1.AssessmentQuestionsComponent, import_question_component_1.ImportQuestionComponent, add_assessment_question_component_1.AddAssessmentQuestionComponent, update_question_component_1.UpdateQuestionComponent],
            providers: [assessment_questions_service_1.AssessmentQuestionsService]
        })
    ], AssessmentQuestionsModule);
    return AssessmentQuestionsModule;
}());
exports.AssessmentQuestionsModule = AssessmentQuestionsModule;
//# sourceMappingURL=assessment-questions.module.js.map