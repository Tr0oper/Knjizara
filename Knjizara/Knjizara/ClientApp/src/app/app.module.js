"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var platform_browser_1 = require("@angular/platform-browser");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var animations_1 = require("@angular/platform-browser/animations");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var portal_1 = require("@angular/cdk/portal");
var scrolling_1 = require("@angular/cdk/scrolling");
var table_1 = require("@angular/cdk/table");
var bottom_sheet_1 = require("@angular/material/bottom-sheet");
var button_1 = require("@angular/material/button");
var button_toggle_1 = require("@angular/material/button-toggle");
var datepicker_1 = require("@angular/material/datepicker");
var material_1 = require("@angular/material");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var list_1 = require("@angular/material/list");
var menu_1 = require("@angular/material/menu");
var paginator_1 = require("@angular/material/paginator");
var radio_1 = require("@angular/material/radio");
var select_1 = require("@angular/material/select");
var sidenav_1 = require("@angular/material/sidenav");
var slider_1 = require("@angular/material/slider");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var sort_1 = require("@angular/material/sort");
var table_2 = require("@angular/material/table");
var toolbar_1 = require("@angular/material/toolbar");
var form_field_1 = require("@angular/material/form-field");
var ngx_toastr_1 = require("ngx-toastr");
var rola_module_1 = require("./role/rola.module");
var proizvod_service_1 = require("./proizvod/proizvod.service");
var create_lista_vrsta_component_1 = require("./vrstaProizvoda/create-lista-vrsta.component");
var stavke_racuna_component_1 = require("./racuni/stavke-racuna/stavke-racuna.component");
var vrsta_proizvoda_service_1 = require("./vrstaProizvoda/vrsta-proizvoda.service");
var racun_service_1 = require("./racuni/racun/racun.service");
var nav_bar_component_1 = require("./nav-bar/nav-bar.component");
var layout_1 = require("@angular/cdk/layout");
var proizvod_module_1 = require("./proizvod/proizvod.module");
var router_1 = require("@angular/router");
var vrsta_proizvoda_module_1 = require("./vrstaProizvoda/vrsta-proizvoda.module");
var racun_module_1 = require("./racuni/racun.module");
var korisnik_module_1 = require("./korisnici/korisnik.module");
var home_module_1 = require("./HomePage/home.module");
var korisnici_service_1 = require("./korisnici/korisnici.service");
var korisnik_service_1 = require("./korisnici/korisnik/korisnik.service");
var stavke_racuna_service_1 = require("./racuni/stavke-racuna/stavke-racuna.service");
var racuni_service_1 = require("./racuni/racuni.service");
var auth_interceptor_1 = require("./auth/auth.interceptor");
var role_service_1 = require("./role/role.service");
var statistika_service_1 = require("./HomePage/statistika.service");
var create_component_1 = require("./proizvod/create.component");
var korisnici_component_1 = require("./korisnici/korisnici.component");
var edit_korisnika_component_1 = require("./korisnici/detalji/edit-korisnika.component");
var godisnji_prikaz_component_1 = require("./UporedjivanjeStatistike/godisnji-prikaz.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                nav_bar_component_1.NavBarComponent,
                godisnji_prikaz_component_1.GodisnjiPrikazComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                ngx_toastr_1.ToastrModule.forRoot({
                    positionClass: "toast-bottom-right",
                    closeButton: true,
                    progressBar: true,
                    progressAnimation: "increasing",
                    timeOut: 2000
                }),
                racun_module_1.RacunModule,
                korisnik_module_1.KorisnikModule,
                proizvod_module_1.ProizvodModule,
                vrsta_proizvoda_module_1.VrstaProizvodaModule,
                home_module_1.HomeModule,
                rola_module_1.RolaModule,
                forms_1.FormsModule,
                table_1.CdkTableModule,
                bottom_sheet_1.MatBottomSheetModule,
                button_1.MatButtonModule,
                button_toggle_1.MatButtonToggleModule,
                datepicker_1.MatDatepickerModule,
                material_1.MatDialogModule,
                input_1.MatInputModule,
                list_1.MatListModule,
                menu_1.MatMenuModule,
                core_2.MatNativeDateModule,
                icon_1.MatIconModule,
                forms_1.ReactiveFormsModule,
                form_field_1.MatFormFieldModule,
                router_1.RouterModule,
                table_2.MatTableModule,
                paginator_1.MatPaginatorModule,
                radio_1.MatRadioModule,
                select_1.MatSelectModule,
                sidenav_1.MatSidenavModule,
                slider_1.MatSliderModule,
                slide_toggle_1.MatSlideToggleModule,
                sort_1.MatSortModule,
                toolbar_1.MatToolbarModule,
                portal_1.PortalModule,
                scrolling_1.ScrollingModule,
                http_1.HttpClientModule,
                animations_1.BrowserAnimationsModule,
                app_routing_module_1.AppRoutingModule,
                material_1.MatTooltipModule,
                layout_1.LayoutModule
            ],
            providers: [proizvod_service_1.ProizvodService, vrsta_proizvoda_service_1.VrstaProizvodaService, racun_service_1.RacunService, korisnici_service_1.KorisniciService, korisnik_service_1.KorisnikService, stavke_racuna_service_1.StavkeRacunaService, racuni_service_1.RacuniService, statistika_service_1.StatistikaService, role_service_1.RoleService,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: auth_interceptor_1.AuthInterceptor,
                    multi: true
                },
                { provide: material_1.MatDialogRef, useValue: {} },
                { provide: material_1.MAT_DIALOG_DATA, useValue: [] },
            ],
            bootstrap: [app_component_1.AppComponent],
            entryComponents: [create_lista_vrsta_component_1.CreateListaVrstaComponent, stavke_racuna_component_1.StavkeRacunaComponent, create_component_1.CreateComponent, korisnici_component_1.KorisniciComponent, edit_korisnika_component_1.EditKorisnikaComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.module.js.map