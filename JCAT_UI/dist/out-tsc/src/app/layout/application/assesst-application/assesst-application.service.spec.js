"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var assesst_application_service_1 = require("./assesst-application.service");
describe('AssesstApplicationService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [assesst_application_service_1.AssesstApplicationService]
        });
    });
    it('should be created', testing_1.inject([assesst_application_service_1.AssesstApplicationService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=assesst-application.service.spec.js.map