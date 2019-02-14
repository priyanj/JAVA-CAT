"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var add_application_service_1 = require("./add-application.service");
describe('AddApplicationService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [add_application_service_1.AddApplicationService]
        });
    });
    it('should be created', testing_1.inject([add_application_service_1.AddApplicationService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=add-application.service.spec.js.map