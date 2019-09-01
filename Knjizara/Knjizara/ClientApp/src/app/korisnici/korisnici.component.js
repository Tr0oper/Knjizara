"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var korisnik_component_1 = require("./korisnik/korisnik.component");
var edit_korisnika_component_1 = require("./detalji/edit-korisnika.component");
var KorisniciComponent = /** @class */ (function () {
    function KorisniciComponent(service, serviceKorisnika, toastr, dialog, router) {
        this.service = service;
        this.serviceKorisnika = serviceKorisnika;
        this.toastr = toastr;
        this.dialog = dialog;
        this.router = router;
        this.displayedColumns = ['korisnikId', 'ime', 'prezime', 'korisnickoIme', 'mail', 'datumRodjenja', 'pol', 'telefon', 'plata', 'rolaId', 'opcije'];
    }
    KorisniciComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getSvihKorisnika().subscribe(function (data) {
            _this.dataSource = new material_1.MatTableDataSource(data);
            _this.dataSource.sort = _this.sort;
            _this.dataSource.paginator = _this.paginator;
        });
    };
    KorisniciComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    KorisniciComponent.prototype.delete = function (id) {
        var _this = this;
        this.service.getKorisnikById(id).subscribe(function (znj) { _this.korisnickoIme = znj.korisnickoIme; });
        this.service.deleteKorisnika(id).subscribe(function (data) {
            _this.toastr.success('Korisnik ' + _this.korisnickoIme + ' je uspesno obrisan!', 'Knjizara');
            _this.service.getSvihKorisnika().subscribe(function (x) {
                _this.dataSource = new material_1.MatTableDataSource(x);
                _this.dataSource.sort = _this.sort;
                _this.dataSource.paginator = _this.paginator;
                _this.router.navigate(['/korisnici']);
            });
        }, function (error) { _this.toastr.warning('Doslo je do greske', 'Knjizara'); });
    };
    KorisniciComponent.prototype.onCreate = function () {
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
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
                _this.router.navigate(['/korisnici']);
            });
        });
    };
    KorisniciComponent.prototype.openForEdit = function (korisnikId) {
        var _this = this;
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "85%";
        dialogConfig.height = "78%";
        dialogConfig.data = { korisnikId: korisnikId };
        var dialogRef = this.dialog.open(edit_korisnika_component_1.EditKorisnikaComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(function (res) {
            _this.service.getSvihKorisnika().subscribe(function (x) {
                _this.dataSource = new material_1.MatTableDataSource(x);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
            });
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: true })
    ], KorisniciComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: true })
    ], KorisniciComponent.prototype, "paginator", void 0);
    KorisniciComponent = __decorate([
        core_1.Component({
            selector: 'app-korisnici',
            templateUrl: './korisnici.component.html',
            styleUrls: ['./korisnici.component.css']
        })
    ], KorisniciComponent);
    return KorisniciComponent;
}());
exports.KorisniciComponent = KorisniciComponent;
//# sourceMappingURL=korisnici.component.js.map