"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var animations_1 = require("@angular/platform-browser/animations");
var assessment_questions_component_1 = require("./assessment-questions.component");
var assessment_questions_module_1 = require("./assessment-questions.module");
describe('AssessmentQuestionsComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                assessment_questions_module_1.AssessmentQuestionsModule,
                testing_2.RouterTestingModule,
                animations_1.BrowserAnimationsModule,
            ],
            declarations: [assessment_questions_component_1.AssessmentQuestionsComponent],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(assessment_questions_component_1.AssessmentQuestionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=assessment-questions.component.spec.js.map