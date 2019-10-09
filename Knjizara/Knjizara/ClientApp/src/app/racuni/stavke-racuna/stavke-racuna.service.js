"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var StavkeRacunaService = /** @class */ (function () {
    function StavkeRacunaService(http, serviceRacun) {
        this.http = http;
        this.serviceRacun = serviceRacun;
        this.url = 'https://localhost:44302';
        this.stavkaForm = new forms_1.FormGroup({
            stavkaRacunaId: new forms_1.FormControl(0),
            sifraRacuna: new forms_1.FormControl(this.serviceRacun.detailForm.get('sifraRacuna')),
            kolicina: new forms_1.FormControl(0),
            cenaPoJedinici: new forms_1.FormControl(0),
            barkod: new forms_1.FormControl(0),
            naziv: new forms_1.FormControl(''),
            ukupno: new forms_1.FormControl(0)
        });
    }
    StavkeRacunaService.prototype.getSvihVrsta = function () {
        return this.http.get(this.url + '/api/VrstaProizvodas');
    };
    StavkeRacunaService.prototype.getStavki = function () {
        return this.http.get(this.url + '/api/VrstaProizvodas');
    };
    StavkeRacunaService.prototype.getCenaByBarkod = function (barkod) {
        return this.http.get(this.url + '/api/VrstaProizvodas/vrsta/' + barkod);
    };
    StavkeRacunaService.prototype.getVrstaByBarkod = function (barkod) {
        return this.http.get(this.url + '/api/VrstaProizvodas/' + barkod);
    };
    StavkeRacunaService.prototype.getStavkePoSifri = function (sifra) {
        return this.http.get(this.url + '/api/StavkaRacunas/racun/' + sifra);
    };
    StavkeRacunaService.prototype.getStavkePoBarkodu = function (sifra, barkod) {
        return this.http.get(this.url + ("/api/StavkaRacunas/" + sifra + "/" + barkod));
    };
    StavkeRacunaService.prototype.postStavke = function (stavka) {
        var reqHeader = new http_1.HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        return this.http.post(this.url + '/api/StavkaRacunas', stavka, { headers: reqHeader });
    };
    StavkeRacunaService.prototype.putStavke = function (id, stavka) {
        var reqHeader = new http_1.HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        return this.http.put(this.url + '/api/StavkaRacunas/' + id, stavka, { headers: reqHeader });
    };
    StavkeRacunaService.prototype.deletetStavke = function (id) {
        return this.http.delete(this.url + '/api/StavkaRacunas/' + id);
    };
    StavkeRacunaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StavkeRacunaService);
    return StavkeRacunaService;
}());
exports.StavkeRacunaService = StavkeRacunaService;
//# sourceMappingURL=stavke-racuna.service.js.map