"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./HomePage/home.component");
var create_component_1 = require("./proizvod/create.component");
var lista_component_1 = require("./proizvod/lista.component");
var details_component_1 = require("./proizvod/details.component");
var lista_vrsta_component_1 = require("./vrstaProizvoda/lista-vrsta.component");
var create_lista_vrsta_component_1 = require("./vrstaProizvoda/create-lista-vrsta.component");
var racuni_component_1 = require("./racuni/racuni.component");
var racun_component_1 = require("./racuni/racun/racun.component");
var korisnici_component_1 = require("./korisnici/korisnici.component");
var korisnik_component_1 = require("./korisnici/korisnik/korisnik.component");
var edit_korisnika_component_1 = require("./korisnici/detalji/edit-korisnika.component");
var login_component_1 = require("./korisnici/login/login.component");
var auth_guard_1 = require("./auth/auth.guard");
var auth_rola_guard_1 = require("./auth/auth-rola.guard");
var role_component_1 = require("./role/role.component");
var rola_component_1 = require("./role/rola/rola.component");
var detalji_role_component_1 = require("./role/detalji-role/detalji-role.component");
var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'dodaj', component: create_component_1.CreateComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'lista', component: lista_component_1.ListaComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'detalji/:id', component: details_component_1.DetailsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'vrsteProizvoda', component: lista_vrsta_component_1.ListaVrstaComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'dodajVrstu', component: create_lista_vrsta_component_1.CreateListaVrstaComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'racuni', component: racuni_component_1.RacuniComponent, canActivate: [auth_guard_1.AuthGuard] },
    {
        path: 'racun', children: [
            { path: '', component: racun_component_1.RacunComponent, canActivate: [auth_guard_1.AuthGuard] },
            { path: 'edit/:sifraRacuna', component: racun_component_1.RacunComponent, canActivate: [auth_guard_1.AuthGuard] }
        ]
    },
    { path: 'korisnici', component: korisnici_component_1.KorisniciComponent, canActivate: [auth_guard_1.AuthGuard, auth_rola_guard_1.AuthRolaGuard], },
    { path: 'korisnik', component: korisnik_component_1.KorisnikComponent, canActivate: [auth_guard_1.AuthGuard, auth_rola_guard_1.AuthRolaGuard] },
    { path: 'korisnik/:korisnikId', component: edit_korisnika_component_1.EditKorisnikaComponent, canActivate: [auth_guard_1.AuthGuard, auth_rola_guard_1.AuthRolaGuard] },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'role', component: role_component_1.RoleComponent, canActivate: [auth_guard_1.AuthGuard, auth_rola_guard_1.AuthRolaGuard] },
    { path: 'rola', component: rola_component_1.RolaComponent, canActivate: [auth_guard_1.AuthGuard, auth_rola_guard_1.AuthRolaGuard] },
    { path: 'detaljiRole/:rolaId', component: detalji_role_component_1.DetaljiRoleComponent, canActivate: [auth_guard_1.AuthGuard, auth_rola_guard_1.AuthRolaGuard] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map