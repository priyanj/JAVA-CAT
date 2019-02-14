"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_error_module_1 = require("./server-error.module");
describe('ServerErrorModule', function () {
    var serverErrorModule;
    beforeEach(function () {
        serverErrorModule = new server_error_module_1.ServerErrorModule();
    });
    it('should create an instance', function () {
        expect(serverErrorModule).toBeTruthy();
    });
});
//# sourceMappingURL=server-error.module.spec.js.map