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
var DetaljiRoleComponent = /** @class */ (function () {
    function DetaljiRoleComponent(service, route, toastr, router) {
        this.service = service;
        this.route = route;
        this.toastr = toastr;
        this.router = router;
        this.displayedColumns = ['korisnikId', 'ime', 'prezime', 'korisnickoIme', 'mail', 'datumRodjenja', 'pol', 'telefon', 'plata', 'opcije'];
    }
    DetaljiRoleComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('rolaId');
        this.service.getRoleById(parseInt(id)).subscribe(function (data) {
            _this.service.detaljiRole.setValue({ rolaId: data.rolaId, naziv: data.naziv });
            _this.service.getKorisnikaById(parseInt(id)).subscribe(function (x) {
                _this.dataSource = new material_1.MatTableDataSource(x);
                _this.dataSource.sort = _this.sort;
                _this.dataSource.paginator = _this.paginator;
            });
        });
    };
    DetaljiRoleComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    DetaljiRoleComponent.prototype.delete = function (idKorisnika) {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('rolaId');
        this.service.deleteKorisnika(idKorisnika).subscribe(function (data) {
            _this.toastr.success('Uspesno ste obrisali korisnika: ' + data.korisnickoIme, 'Knjizara');
            _this.service.getKorisnikaById(parseInt(id)).subscribe(function (x) {
                _this.dataSource = new material_1.MatTableDataSource(x);
                _this.dataSource.sort = _this.sort;
                _this.dataSource.paginator = _this.paginator;
            }, function (err) { _this.toastr.error('Doslo je do greske!', 'Knjizara'); });
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: true })
    ], DetaljiRoleComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: true })
    ], DetaljiRoleComponent.prototype, "paginator", void 0);
    DetaljiRoleComponent = __decorate([
        core_1.Component({
            selector: 'app-detalji-role',
            templateUrl: './detalji-role.component.html',
            styleUrls: ['./detalji-role.component.css']
        })
    ], DetaljiRoleComponent);
    return DetaljiRoleComponent;
}());
exports.DetaljiRoleComponent = DetaljiRoleComponent;
//# sourceMappingURL=detalji-role.component.js.map