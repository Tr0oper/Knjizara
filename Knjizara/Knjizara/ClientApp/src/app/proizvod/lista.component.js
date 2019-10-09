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
var animations_1 = require("@angular/animations");
var dialog_1 = require("@angular/material/dialog");
var create_component_1 = require("./create.component");
var ListaComponent = /** @class */ (function () {
    function ListaComponent(service, toastr, route, dialog) {
        this.service = service;
        this.toastr = toastr;
        this.route = route;
        this.dialog = dialog;
        this.displayedColumns = ['proizvodId', 'naziv', 'opcije'];
    }
    ListaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getSvihProizvoda().subscribe(function (x) {
            _this.dataSource = new table_1.MatTableDataSource(x);
            _this.dataSource.sort = _this.sort;
            _this.dataSource.paginator = _this.paginator;
        });
    };
    ListaComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    ListaComponent.prototype.delete = function (id) {
        var _this = this;
        this.service.deleteProizvoda(id)
            .subscribe(function (data) {
            _this.toastr.success('Proizvod uspesno obrisan', 'Knjizara');
            _this.service.getSvihProizvoda()
                .subscribe(function (x) {
                _this.dataSource = new table_1.MatTableDataSource(x);
                _this.dataSource.sort = _this.sort;
                _this.dataSource.paginator = _this.paginator;
                _this.route.navigate(['/lista']);
            });
        }, function (error) { _this.toastr.warning('Doslo je do greske', 'Knjizara'); });
    };
    ListaComponent.prototype.onSubmit = function (proizvod) {
        var _this = this;
        this.service.formUpdate.setValue({ proizvodId: proizvod.proizvodId, naziv: this.service.formUpdate.get('naziv').value });
        if (!this.service.formUpdate.get('naziv').value) {
            this.toastr.error('Greska, polje za naziv mora biti popunjeno!', 'Knjizara');
        }
        else {
            this.service.putProizvoda(this.service.formUpdate.value).subscribe(function (data) {
                _this.toastr.success('Proizvod je uspesno izmenjen', 'Knjizara');
                _this.service.getSvihProizvoda().subscribe(function (x) {
                    _this.dataSource = new table_1.MatTableDataSource(x);
                    _this.dataSource.sort = _this.sort;
                    _this.dataSource.paginator = _this.paginator;
                    _this.service.formUpdate.reset();
                });
            });
        }
    };
    ListaComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogConfig = new dialog_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "35%";
        dialogConfig.height = "55%";
        var dialogRef = this.dialog.open(create_component_1.CreateComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(function (res) {
            _this.service.getSvihProizvoda().subscribe(function (x) {
                _this.dataSource = new table_1.MatTableDataSource(x);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
            });
        });
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort, { static: true })
    ], ListaComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], ListaComponent.prototype, "paginator", void 0);
    ListaComponent = __decorate([
        core_1.Component({
            selector: 'app-lista',
            templateUrl: './lista.component.html',
            styleUrls: ['./lista.component.css'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], ListaComponent);
    return ListaComponent;
}());
exports.ListaComponent = ListaComponent;
//# sourceMappingURL=lista.component.js.map