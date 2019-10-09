"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var StavkeRacunaComponent = /** @class */ (function () {
    function StavkeRacunaComponent(data, dialogRef, service, toastr, racunService) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.service = service;
        this.toastr = toastr;
        this.racunService = racunService;
    }
    StavkeRacunaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getSvihVrsta().subscribe(function (data) {
            _this.vrste = data;
            _this.service.getVrstaByBarkod(_this.service.stavkaForm.get('barkod').value).subscribe(function (x) {
                _this.selected = x.barkod.toString();
            });
        });
        if (this.data.stavkaRacunaIndex == null) {
            this.service.stavkaForm = new forms_1.FormGroup({
                stavkaRacunaId: new forms_1.FormControl(0),
                sifraRacuna: new forms_1.FormControl(this.racunService.detailForm.get('sifraRacuna').value),
                kolicina: new forms_1.FormControl(0),
                cenaPoJedinici: new forms_1.FormControl(0),
                barkod: new forms_1.FormControl(0),
                naziv: new forms_1.FormControl(''),
                ukupno: new forms_1.FormControl(0)
            });
        }
        else {
            var stavka = this.racunService.stavke[this.data.stavkaRacunaIndex];
            this.service.stavkaForm.patchValue({
                stavkaRacunaId: stavka.stavkaRacunaId,
                sifraRacuna: stavka.sifraRacuna, kolicina: stavka.kolicina,
                cenaPoJedinici: stavka.cenaPoJedinici, barkod: stavka.barkod, naziv: stavka.naziv, ukupno: stavka.ukupno
            });
        }
    };
    StavkeRacunaComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (this.data.stavkaRacunaIndex == null) {
            var stavke_1 = this.service.stavkaForm.value;
            this.service.postStavke(this.service.stavkaForm.value).subscribe(function (data) {
                _this.racunService.stavke.push(stavke_1);
                _this.toastr.success('Stavka racuna je uspesno dodata', 'Knjizara');
                _this.service.stavkaForm.reset();
            }, function (error) { _this.toastr.warning('Doslo je do greske', 'Knjizara'); });
            this.onClose();
        }
        else {
            this.service.getStavkePoBarkodu(this.service.stavkaForm.get('sifraRacuna').value, this.service.stavkaForm.get('barkod').value).subscribe(function (data) {
                _this.stavkaId = _this.service.stavkaForm.get('stavkaRacunaId').value;
                console.log(data);
                _this.service.putStavke(_this.stavkaId, _this.service.stavkaForm.value).subscribe(function (x) {
                    _this.toastr.success('Stavka racuna je uspesno izmenjena', 'Knjizara');
                    _this.racunService.stavke[_this.data.stavkaRacunaIndex] = form.value;
                }, function (error) {
                    _this.toastr.warning('Doslo je do greske', 'Knjizara');
                    return;
                });
            });
        }
        this.dialogRef.close();
    };
    StavkeRacunaComponent.prototype.onClose = function () {
        this.dialogRef.close();
        this.service.stavkaForm.reset();
    };
    StavkeRacunaComponent.prototype.updateCena = function (ctrl) {
        var _this = this;
        if (ctrl.value === undefined) {
            this.service.stavkaForm.patchValue({ cenaPoJedinici: 0 });
            this.service.stavkaForm.patchValue({ naziv: '' });
        }
        else {
            this.service.getCenaByBarkod(ctrl.value).subscribe(function (data) {
                _this.service.stavkaForm.patchValue({ cenaPoJedinici: data.toFixed(2) });
            });
            this.service.getVrstaByBarkod(ctrl.value).subscribe(function (vp) {
                _this.service.stavkaForm.patchValue({ naziv: vp.naziv });
            });
        }
    };
    StavkeRacunaComponent.prototype.updateUkupno = function (ctrl) {
        var _this = this;
        this.service.getCenaByBarkod(this.service.stavkaForm.get('barkod').value).subscribe(function (r) {
            _this.service.stavkaForm.patchValue({ ukupno: r * _this.service.stavkaForm.get('kolicina').value });
        });
    };
    StavkeRacunaComponent = __decorate([
        core_1.Component({
            selector: 'app-stavke-racuna',
            templateUrl: './stavke-racuna.component.html',
            styleUrls: ['./stavke-racuna.component.css']
        }),
        __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], StavkeRacunaComponent);
    return StavkeRacunaComponent;
}());
exports.StavkeRacunaComponent = StavkeRacunaComponent;
//# sourceMappingURL=stavke-racuna.component.js.map