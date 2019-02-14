"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var change_password_service_1 = require("./change-password.service");
describe('ChangePasswordService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [change_password_service_1.ChangePasswordService]
        });
    });
    it('should be created', testing_1.inject([change_password_service_1.ChangePasswordService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=change-password.service.spec.js.map