"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var for_migration_pattern_service_1 = require("./for-migration-pattern.service");
describe('ForMigrationPatternService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [for_migration_pattern_service_1.ForMigrationPatternService]
        });
    });
    it('should be created', testing_1.inject([for_migration_pattern_service_1.ForMigrationPatternService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=for-migration-pattern.service.spec.js.map