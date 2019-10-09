"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var stavke_racuna_component_1 = require("../stavke-racuna/stavke-racuna.component");
var forms_1 = require("@angular/forms");
var RacunComponent = /** @class */ (function () {
    function RacunComponent(service, racuniService, dialog, stavkaService, route, toastr, router) {
        this.service = service;
        this.racuniService = racuniService;
        this.dialog = dialog;
        this.stavkaService = stavkaService;
        this.route = route;
        this.toastr = toastr;
        this.router = router;
    }
    RacunComponent.prototype.ngOnInit = function () {
        var _this = this;
        var sifraRacuna = this.router.snapshot.paramMap.get('sifraRacuna');
        if (sifraRacuna == null) {
            this.stavkaService.stavkaForm = new forms_1.FormGroup({
                stavkaRacunaId: new forms_1.FormControl(0),
                sifraRacuna: new forms_1.FormControl(this.service.detailForm.get('sifraRacuna').value),
                kolicina: new forms_1.FormControl(0),
                cenaPoJedinici: new forms_1.FormControl(0),
                barkod: new forms_1.FormControl(0),
                naziv: new forms_1.FormControl(''),
                ukupno: new forms_1.FormControl(0)
            });
        }
        else {
            this.racuniService.getRacunaBySifra(parseInt(sifraRacuna)).subscribe(function (data) {
                _this.service.detailForm.setValue({ sifraRacuna: data.sifraRacuna, vremeIzdavanja: data.vremeIzdavanja, ukupanIznos: data.ukupanIznos });
                _this.stavkaService.getStavkePoSifri(parseInt(sifraRacuna)).subscribe(function (data) {
                    _this.service.getSvihBarkodova(parseInt(sifraRacuna)).subscribe(function (x) {
                        var _loop_1 = function (i) {
                            if (x[i] != null) {
                                _this.service.getVrstePoBarkodu(x[i]).subscribe(function (y) {
                                    data[i].naziv = y.naziv;
                                    data[i].ukupno = data[i].kolicina * y.cena;
                                    _this.service.stavke = data;
                                });
                            }
                        };
                        for (var i = 0; i < 50; i++) {
                            _loop_1(i);
                        }
                    });
                });
            });
        }
    };
    RacunComponent.prototype.AddOrEdit = function (stavkaRacunaIndex, sifraRacuna) {
        var _this = this;
        var dialogConfig = new dialog_1.MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "50%";
        dialogConfig.data = { stavkaRacunaIndex: stavkaRacunaIndex, sifraRacuna: sifraRacuna };
        this.dialog.open(stavke_racuna_component_1.StavkeRacunaComponent, dialogConfig).afterClosed().subscribe(function (res) {
            _this.updateSume();
        });
    };
    RacunComponent.prototype.updateSume = function () {
        var pom = this.service.stavke.reduce(function (prev, curr) { return prev + curr.ukupno; }, 0);
        this.service.detailForm.patchValue({ ukupanIznos: pom });
    };
    RacunComponent.prototype.onDeleteStavkaRacuna = function (stavkaRacunaId, i) {
        var _this = this;
        this.stavkaService.getStavkePoBarkodu(this.service.stavke[i].sifraRacuna, this.service.stavke[i].barkod).subscribe(function (data) {
            _this.stavkaService.deletetStavke(data.stavkaRacunaId).subscribe(function (x) {
                _this.service.stavke.splice(i, 1);
                _this.updateSume();
                _this.toastr.success('Stavka racuna je uspesno izbrisana', 'Knjizara');
            }, function (error) { _this.toastr.warning('Doslo je do greske', 'Knjizara'); });
        });
    };
    RacunComponent.prototype.print = function () {
        window.print();
        window.location.reload();
    };
    RacunComponent.prototype.redirectNaListu = function () {
        this.service.detailForm = new forms_1.FormGroup({
            sifraRacuna: new forms_1.FormControl(Math.floor(1000000 + Math.random() * 900000000)),
            vremeIzdavanja: new forms_1.FormControl(new Date),
            ukupanIznos: new forms_1.FormControl(0)
        });
        this.service.stavke = [];
        this.route.navigate(['/racuni']);
    };
    RacunComponent = __decorate([
        core_1.Component({
            selector: 'app-racun',
            templateUrl: './racun.component.html',
            styleUrls: ['./racun.component.css']
        })
    ], RacunComponent);
    return RacunComponent;
}());
exports.RacunComponent = RacunComponent;
//# sourceMappingURL=racun.component.js.map