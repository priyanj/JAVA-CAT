"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var view_application_service_1 = require("./view-application.service");
describe('ViewApplicationService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [view_application_service_1.ViewApplicationService]
        });
    });
    it('should be created', testing_1.inject([view_application_service_1.ViewApplicationService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=view-application.service.spec.js.map