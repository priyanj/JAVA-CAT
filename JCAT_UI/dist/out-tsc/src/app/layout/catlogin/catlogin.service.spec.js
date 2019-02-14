"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var catlogin_service_1 = require("./catlogin.service");
describe('CatloginService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [catlogin_service_1.CatloginService]
        });
    });
    it('should be created', testing_1.inject([catlogin_service_1.CatloginService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=catlogin.service.spec.js.map