"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var feedback_service_1 = require("./feedback.service");
describe('FeedbackService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [feedback_service_1.FeedbackService]
        });
    });
    it('should be created', testing_1.inject([feedback_service_1.FeedbackService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=feedback.service.spec.js.map