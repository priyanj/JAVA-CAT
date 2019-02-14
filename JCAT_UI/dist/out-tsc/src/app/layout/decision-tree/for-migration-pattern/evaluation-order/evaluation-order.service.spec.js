"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var evaluation_order_service_1 = require("./evaluation-order.service");
describe('EvaluationOrderService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [evaluation_order_service_1.EvaluationOrderService]
        });
    });
    it('should be created', testing_1.inject([evaluation_order_service_1.EvaluationOrderService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=evaluation-order.service.spec.js.map