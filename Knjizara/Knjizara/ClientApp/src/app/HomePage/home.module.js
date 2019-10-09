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
var tooltip_1 = require("@angular/material/tooltip");
var home_component_1 = require("./home.component");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var router_1 = require("@angular/router");
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            declarations: [
                home_component_1.HomeComponent
            ],
            imports: [
                common_1.CommonModule,
                material_1.MatToolbarModule,
                forms_1.ReactiveFormsModule,
                material_1.MatFormFieldModule,
                forms_1.ReactiveFormsModule,
                material_1.MatTableModule,
                material_1.MatPaginatorModule,
                material_1.MatSortModule,
                material_1.MatInputModule,
                material_1.MatSelectModule,
                material_1.MatIconModule,
                material_1.MatButtonModule,
                material_1.MatDialogModule,
                router_1.RouterModule,
                tooltip_1.MatTooltipModule
            ]
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map