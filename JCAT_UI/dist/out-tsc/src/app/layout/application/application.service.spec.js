"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var application_service_1 = require("./application.service");
describe('ApplicationService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [application_service_1.ApplicationService]
        });
    });
    it('should be created', testing_1.inject([application_service_1.ApplicationService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=application.service.spec.js.map