"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var for_cloudable_service_1 = require("./for-cloudable.service");
describe('ForCloudableService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [for_cloudable_service_1.ForCloudableService]
        });
    });
    it('should be created', testing_1.inject([for_cloudable_service_1.ForCloudableService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=for-cloudable.service.spec.js.map