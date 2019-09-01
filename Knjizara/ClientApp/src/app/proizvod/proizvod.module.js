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
var create_component_1 = require("./create.component");
var lista_component_1 = require("./lista.component");
var details_component_1 = require("./details.component");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var ProizvodModule = /** @class */ (function () {
    function ProizvodModule() {
    }
    ProizvodModule = __decorate([
        core_1.NgModule({
            declarations: [
                create_component_1.CreateComponent,
                lista_component_1.ListaComponent,
                details_component_1.DetailsComponent
            ],
            imports: [
                common_1.CommonModule,
                material_1.MatIconModule,
                material_1.MatToolbarModule,
                forms_1.ReactiveFormsModule,
                material_1.MatFormFieldModule,
                router_1.RouterModule,
                material_1.MatTableModule,
                material_1.MatPaginatorModule,
                material_1.MatSortModule,
                material_1.MatInputModule,
                material_1.MatButtonModule
            ]
        })
    ], ProizvodModule);
    return ProizvodModule;
}());
exports.ProizvodModule = ProizvodModule;
//# sourceMappingURL=proizvod.module.js.map