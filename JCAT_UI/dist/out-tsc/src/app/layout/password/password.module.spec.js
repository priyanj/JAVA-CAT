"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var password_module_1 = require("./password.module");
describe('PasswordModule', function () {
    var passwordModule;
    beforeEach(function () {
        passwordModule = new password_module_1.PasswordModule();
    });
    it('should create an instance', function () {
        expect(passwordModule).toBeTruthy();
    });
});
//# sourceMappingURL=password.module.spec.js.map