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
var korisnici_component_1 = require("./korisnici.component");
var korisnik_component_1 = require("./korisnik/korisnik.component");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var edit_korisnika_component_1 = require("./detalji/edit-korisnika.component");
var login_component_1 = require("./login/login.component");
var KorisnikModule = /** @class */ (function () {
    function KorisnikModule() {
    }
    KorisnikModule = __decorate([
        core_1.NgModule({
            declarations: [
                korisnici_component_1.KorisniciComponent,
                korisnik_component_1.KorisnikComponent,
                edit_korisnika_component_1.EditKorisnikaComponent,
                login_component_1.LoginComponent
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
                material_1.MatButtonModule,
                material_1.MatDatepickerModule,
                material_1.MatRadioModule,
                material_1.MatSelectModule
            ],
            providers: []
        })
    ], KorisnikModule);
    return KorisnikModule;
}());
exports.KorisnikModule = KorisnikModule;
//# sourceMappingURL=korisnik.module.js.map