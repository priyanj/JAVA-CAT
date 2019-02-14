"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var for_cloud_provider_service_1 = require("./for-cloud-provider.service");
describe('ForCloudProviderService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [for_cloud_provider_service_1.ForCloudProviderService]
        });
    });
    it('should be created', testing_1.inject([for_cloud_provider_service_1.ForCloudProviderService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=for-cloud-provider.service.spec.js.map