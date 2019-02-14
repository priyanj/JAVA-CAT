"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var assessment_questions_service_1 = require("./assessment-questions.service");
describe('AssessmentQuestionsService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [assessment_questions_service_1.AssessmentQuestionsService]
        });
    });
    it('should be created', testing_1.inject([assessment_questions_service_1.AssessmentQuestionsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=assessment-questions.service.spec.js.map