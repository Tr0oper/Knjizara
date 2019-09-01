"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var layout_1 = require("@angular/cdk/layout");
var material_1 = require("@angular/material");
var korisnik_component_1 = require("../korisnici/korisnik/korisnik.component");
var NavBarComponent = /** @class */ (function () {
    function NavBarComponent(breakpointObserver, stavkaService, service, route, dialog) {
        this.breakpointObserver = breakpointObserver;
        this.stavkaService = stavkaService;
        this.service = service;
        this.route = route;
        this.dialog = dialog;
        this.isHandset$ = this.breakpointObserver.observe(layout_1.Breakpoints.Handset);
    }
    NavBarComponent.prototype.ngOnInit = function () {
    };
    NavBarComponent.prototype.func = function () {
        this.route.navigate(['/racun']);
    };
    NavBarComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "85%";
        dialogConfig.height = "78%";
        var dialogRef = this.dialog.open(korisnik_component_1.KorisnikComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(function (res) {
            _this.service.getSvihKorisnika().subscribe(function (x) {
                _this.dataSource = new material_1.MatTableDataSource(x);
                _this.dataSource.sort = _this.sort;
                _this.dataSource.paginator = _this.paginator;
                _this.route.navigate(['/korisnici']);
            });
        });
    };
    NavBarComponent.prototype.odjava = function () {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('rola');
        this.route.navigate(['/home']);
    };
    NavBarComponent.prototype.ulogovan = function () {
        var token = sessionStorage.getItem('token');
        return !!token;
    };
    NavBarComponent.prototype.isRola = function () {
        var rola = sessionStorage.getItem('rola');
        if (rola === "1")
            return true;
        else
            return false;
    };
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: true })
    ], NavBarComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: true })
    ], NavBarComponent.prototype, "paginator", void 0);
    NavBarComponent = __decorate([
        core_1.Component({
            selector: 'app-nav-bar',
            templateUrl: './nav-bar.component.html',
            styleUrls: ['./nav-bar.component.css']
        })
    ], NavBarComponent);
    return NavBarComponent;
}());
exports.NavBarComponent = NavBarComponent;
//# sourceMappingURL=nav-bar.component.js.map