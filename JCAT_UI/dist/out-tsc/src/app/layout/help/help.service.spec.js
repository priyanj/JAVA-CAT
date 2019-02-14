"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var help_service_1 = require("./help.service");
describe('HelpService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [help_service_1.HelpService]
        });
    });
    it('should be created', testing_1.inject([help_service_1.HelpService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=help.service.spec.js.map