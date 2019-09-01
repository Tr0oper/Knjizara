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
var RacuniComponent = /** @class */ (function () {
    function RacuniComponent(service, toastr, route) {
        this.service = service;
        this.toastr = toastr;
        this.route = route;
        this.displayedColumns = ['sifraRacuna', 'vremeIzdavanja', 'ukupanIznos', 'opcije'];
    }
    RacuniComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getSvihRacuna().subscribe(function (data) {
            _this.dataSource = new material_1.MatTableDataSource(data);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    RacuniComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    RacuniComponent.prototype.delete = function (sifra) {
        var _this = this;
        this.service.deleteRacuna(sifra).subscribe(function (datra) {
            _this.toastr.success('Uspesno ste obrisali racun sa sifrom: ' + sifra, 'Knjizara');
            _this.service.getSvihRacuna().subscribe(function (data) {
                _this.dataSource = new material_1.MatTableDataSource(data);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
                _this.route.navigate(['/racuni']);
            });
        }, function (error) { _this.toastr.warning('Doslo je do greske', 'Knjizara'); });
    };
    RacuniComponent.prototype.onCreate = function () {
        this.route.navigate(['/racun']);
    };
    RacuniComponent.prototype.openForEdit = function (sifraRacuna) {
        this.route.navigate(['/racun/edit/' + sifraRacuna]);
    };
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: true })
    ], RacuniComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: true })
    ], RacuniComponent.prototype, "paginator", void 0);
    RacuniComponent = __decorate([
        core_1.Component({
            selector: 'app-racuni',
            templateUrl: './racuni.component.html',
            styleUrls: ['./racuni.component.css']
        })
    ], RacuniComponent);
    return RacuniComponent;
}());
exports.RacuniComponent = RacuniComponent;
//# sourceMappingURL=racuni.component.js.map