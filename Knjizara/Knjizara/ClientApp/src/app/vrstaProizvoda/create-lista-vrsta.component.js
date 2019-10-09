"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sort_1 = require("@angular/material/sort");
var paginator_1 = require("@angular/material/paginator");
var CreateListaVrstaComponent = /** @class */ (function () {
    function CreateListaVrstaComponent(service, toastr, dialogRef, router) {
        this.service = service;
        this.toastr = toastr;
        this.dialogRef = dialogRef;
        this.router = router;
    }
    CreateListaVrstaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getSvihProizvoda().subscribe(function (data) { return _this.proizvodi = data; });
    };
    CreateListaVrstaComponent.prototype.onSubmit = function () {
        var _this = this;
        this.service.postVrste(this.service.createForm.value)
            .subscribe(function (data) {
            _this.toastr.success('Proizvod uspesno dodat', 'Knjizara');
            _this.service.createForm.reset();
        }, function (error) { _this.toastr.error('Doslo je do greske, nije moguce dodati nov proizvod', 'Knjizara'); });
        this.onClose();
    };
    CreateListaVrstaComponent.prototype.onClose = function () {
        this.service.createForm.reset();
        this.dialogRef.close();
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort, { static: true })
    ], CreateListaVrstaComponent.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], CreateListaVrstaComponent.prototype, "paginator", void 0);
    CreateListaVrstaComponent = __decorate([
        core_1.Component({
            selector: 'app-create-lista-vrsta',
            templateUrl: './create-lista-vrsta.component.html',
            styleUrls: ['./create-lista-vrsta.component.css']
        })
    ], CreateListaVrstaComponent);
    return CreateListaVrstaComponent;
}());
exports.CreateListaVrstaComponent = CreateListaVrstaComponent;
//# sourceMappingURL=create-lista-vrsta.component.js.map