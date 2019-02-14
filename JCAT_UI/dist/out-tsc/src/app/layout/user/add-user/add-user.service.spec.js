"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var add_user_service_1 = require("./add-user.service");
describe('AddUserService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [add_user_service_1.AddUserService]
        });
    });
    it('should be created', testing_1.inject([add_user_service_1.AddUserService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=add-user.service.spec.js.map