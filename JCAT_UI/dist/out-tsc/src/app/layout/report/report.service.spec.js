"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var report_service_1 = require("./report.service");
describe('ReportService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [report_service_1.ReportService]
        });
    });
    it('should be created', testing_1.inject([report_service_1.ReportService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=report.service.spec.js.map