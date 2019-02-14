"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var user_role_service_1 = require("./user-role.service");
describe('UserRoleService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [user_role_service_1.UserRoleService]
        });
    });
    it('should be created', testing_1.inject([user_role_service_1.UserRoleService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=user-role.service.spec.js.map