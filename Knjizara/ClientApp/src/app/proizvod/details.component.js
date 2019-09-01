"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var sort_1 = require("@angular/material/sort");
var paginator_1 = require("@angular/material/paginator");
var DetailsComponent = /** @class */ (function () {
    function DetailsComponent(proizvodService, route, service, toastr, router) {
        this.proizvodService = proizvodService;
        this.route = route;
        this.service = service;
        this.toastr = toastr;
        this.router = router;
        this.displayedColumns = ['barkod', 'naziv', 'cena', 'kolicina', 'proizvodjac', 'zemljaPorekla', 'proizvodId', 'opcije']; //'cena', 'kolicina', 'proizvodjac', 'zemljaPorekla', 'proizvodId',
    }
    DetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        this.proizvodService.getProizvodById(+id).subscribe(function (data) {
            _this.proizvodService.detailForm.setValue({ proizvodId: data.proizvodId, naziv: data.naziv });
            _this.proizvodService.getVrstePoIdProizvoda(+id).subscribe(function (x) {
                _this.dataSource = new table_1.MatTableDataSource(x);
                _this.dataSource.sort = _this.sort;
                _this.dataSource.paginator = _this.paginator;
            });
        });
    };
    DetailsComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    DetailsComponent.prototype.delete = function (barkod) {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        this.service.deleteVrsta(barkod).subscribe(function (data) {
            _this.toastr.success('Uspesno ste obrisali proizvod', 'Knjizara');
            _this.proizvodService.getVrstePoIdProizvoda(+id).subscribe(function (x) {
                _this.dataSource = new table_1.MatTableDataSource(x);
                _this.dataSource.sort = _this.sort;
                _this.dataSource.paginator = _this.paginator;
                _this.router.navigate(['/detalji/' + id]);
            }, function (err) { _this.toastr.error('Doslo je do greske!', 'Knjizara'); });
        });
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort, { static: true })
    ], DetailsComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], DetailsComponent.prototype, "paginator", void 0);
    DetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-details',
            templateUrl: './details.component.html',
            styleUrls: ['./details.component.css']
        })
    ], DetailsComponent);
    return DetailsComponent;
}());
exports.DetailsComponent = DetailsComponent;
//# sourceMappingURL=details.component.js.map