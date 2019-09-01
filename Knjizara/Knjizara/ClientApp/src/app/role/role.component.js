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
var material_1 = require("@angular/material");
var rola_component_1 = require("./rola/rola.component");
var RoleComponent = /** @class */ (function () {
    function RoleComponent(service, toastr, router, dialog) {
        this.service = service;
        this.toastr = toastr;
        this.router = router;
        this.dialog = dialog;
        this.displayedColumns = ['rolaId', 'naziv', 'opcije'];
    }
    RoleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getSvihRola().subscribe(function (data) {
            _this.dataSource = new material_1.MatTableDataSource(data);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    RoleComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    RoleComponent.prototype.delete = function (id) {
        var _this = this;
        this.service.deleteRole(id)
            .subscribe(function (data) {
            _this.toastr.success('Rola uspesno obrisana', 'Knjizara');
            _this.service.getSvihRola()
                .subscribe(function (x) {
                _this.dataSource = new material_1.MatTableDataSource(x);
                _this.dataSource.sort = _this.sort;
                _this.dataSource.paginator = _this.paginator;
                _this.router.navigate(['/role']);
            });
        }, function (error) { _this.toastr.warning('Doslo je do greske', 'Knjizara'); });
    };
    RoleComponent.prototype.onCreate = function () {
        var _this = this;
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "30%";
        dialogConfig.height = "40%";
        var dialogRef = this.dialog.open(rola_component_1.RolaComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(function (res) {
            _this.service.getSvihRola().subscribe(function (x) {
                _this.dataSource = new material_1.MatTableDataSource(x);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
                _this.router.navigate(['/role']);
            });
        });
    };
    RoleComponent.prototype.onSubmit = function (rola) {
        var _this = this;
        this.service.roleForm.patchValue({ rolaId: rola.rolaId });
        this.service.putRole(this.service.roleForm.value).subscribe(function (data) {
            _this.toastr.success('Rola je uspesno izmenjena', 'Knjizara');
            _this.service.getSvihRola().subscribe(function (x) {
                _this.dataSource = new material_1.MatTableDataSource(x);
                _this.dataSource.sort = _this.sort;
                _this.dataSource.paginator = _this.paginator;
                _this.service.roleForm.reset();
            });
        }, function (err) {
            _this.toastr.error('Doslo je do greske!', 'Knjizara');
            console.log(err);
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: true })
    ], RoleComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: true })
    ], RoleComponent.prototype, "paginator", void 0);
    RoleComponent = __decorate([
        core_1.Component({
            selector: 'app-role',
            templateUrl: './role.component.html',
            styleUrls: ['./role.component.css'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], RoleComponent);
    return RoleComponent;
}());
exports.RoleComponent = RoleComponent;
//# sourceMappingURL=role.component.js.map