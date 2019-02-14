"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var core_1 = require("@ngx-translate/core");
var layout_component_1 = require("./layout.component");
var layout_module_1 = require("./layout.module");
describe('LayoutComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                layout_module_1.LayoutModule,
                testing_2.RouterTestingModule,
                core_1.TranslateModule.forRoot(),
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(layout_component_1.LayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=layout.component.spec.js.map