"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular_datatables_1 = require("angular-datatables");
var forms_1 = require("@angular/forms");
var user_routing_module_1 = require("./user-routing.module");
var user_component_1 = require("./user.component");
var add_user_component_1 = require("./add-user/add-user.component");
var update_user_component_1 = require("./update-user/update-user.component");
var upload_user_component_1 = require("./upload-user/upload-user.component");
var change_password_component_1 = require("./change-password/change-password.component");
var user_role_component_1 = require("./user-role/user-role.component");
var ngx_youtube_player_1 = require("ngx-youtube-player");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, user_routing_module_1.UserRoutingModule, angular_datatables_1.DataTablesModule, forms_1.FormsModule, ngx_youtube_player_1.YoutubePlayerModule],
            declarations: [user_component_1.UserComponent, add_user_component_1.AddUserComponent, update_user_component_1.UpdateUserComponent, upload_user_component_1.UploadUserComponent, change_password_component_1.ChangePasswordComponent, user_role_component_1.UserRoleComponent]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map