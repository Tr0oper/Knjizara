"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var dialog_1 = require("@angular/material/dialog");
var create_lista_vrsta_component_1 = require("./create-lista-vrsta.component");
var DialogContentExample = /** @class */ (function () {
    function DialogContentExample(dialog) {
        this.dialog = dialog;
    }
    DialogContentExample.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(ListaVrstaComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("Dialog result: " + result);
        });
    };
    return DialogContentExample;
}());
exports.DialogContentExample = DialogContentExample;
var ListaVrstaComponent = /** @class */ (function () {
    function ListaVrstaComponent(service, toastr, dialog) {
        this.service = service;
        this.toastr = toastr;
        this.dialog = dialog;
        this.displayedColumns = ['barkod', 'naziv', 'cena', 'kolicina', 'proizvodjac', 'zemljaPorekla', 'proizvodId', 'opcije']; //'cena', 'kolicina', 'proizvodjac', 'zemljaPorekla', 'proizvodId',
    }
    ListaVrstaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getSvihVrsta().subscribe(function (data) {
            _this.dataSource = new table_1.MatTableDataSource(data);
            _this.dataSource.sort = _this.sort;
            _this.dataSource.paginator = _this.paginator;
        });
    };
    ListaVrstaComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    ListaVrstaComponent.prototype.delete = function (barkod) {
        var _this = this;
        this.service.deleteVrsta(barkod).subscribe(function (data) {
            _this.toastr.error('Greska pri cuvanju izmena u bazi', 'Knjizara');
            _this.service.getSvihVrsta().subscribe(function (x) {
                _this.dataSource = new table_1.MatTableDataSource(x);
                _this.dataSource.sort = _this.sort;
                _this.dataSource.paginator = _this.paginator;
            });
        }, function (error) { _this.toastr.error('Doslo je do greske', 'Knjizara'); });
    };
    ListaVrstaComponent.prototype.onSubmit = function (vrsta) {
        var _this = this;
        this.service.formUpdate.setValue({
            barkod: vrsta.barkod,
            naziv: this.service.formUpdate.get('naziv').value ? this.service.formUpdate.get('naziv').value : vrsta.naziv,
            cena: this.service.formUpdate.get('cena').value ? this.service.formUpdate.get('cena').value : vrsta.cena,
            kolicina: this.service.formUpdate.get('kolicina').value ? this.service.formUpdate.get('kolicina').value : vrsta.kolicina,
            proizvodjac: this.service.formUpdate.get('proizvodjac').value ? this.service.formUpdate.get('proizvodjac').value : vrsta.proizvodjac,
            zemljaPorekla: this.service.formUpdate.get('zemljaPorekla').value ? this.service.formUpdate.get('zemljaPorekla').value : vrsta.zemljaPorekla,
            proizvodId: vrsta.proizvodId
        });
        this.service.putVrste(this.service.formUpdate.value).subscribe(function (data) {
            _this.toastr.success('Vrsta proizvoda je uspesno izmenjena', 'Knjizara');
            _this.service.getSvihVrsta().subscribe(function (x) {
                _this.dataSource = new table_1.MatTableDataSource(x);
                _this.dataSource.sort = _this.sort;
                _this.dataSource.paginator = _this.paginator;
                _this.service.formUpdate.reset();
            });
        }, function (error) { _this.toastr.error('Doslo je do greske, nije moguce sacuvati unete izmene', 'Knjizara'); });
    };
    ListaVrstaComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogConfig = new dialog_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "68% ";
        var dialogRef = this.dialog.open(create_lista_vrsta_component_1.CreateListaVrstaComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(function (res) {
            _this.service.getSvihVrsta().subscribe(function (x) {
                _this.dataSource = new table_1.MatTableDataSource(x);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
            });
        });
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort, { static: true })
    ], ListaVrstaComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], ListaVrstaComponent.prototype, "paginator", void 0);
    ListaVrstaComponent = __decorate([
        core_1.Component({
            selector: 'app-lista-vrsta',
            templateUrl: './lista-vrsta.component.html',
            styleUrls: ['./lista-vrsta.component.css'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ],
        })
    ], ListaVrstaComponent);
    return ListaVrstaComponent;
}());
exports.ListaVrstaComponent = ListaVrstaComponent;
//# sourceMappingURL=lista-vrsta.component.js.map