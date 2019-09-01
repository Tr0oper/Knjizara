"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RacunService = /** @class */ (function () {
    function RacunService(http) {
        this.http = http;
        this.detailForm = new forms_1.FormGroup({
            sifraRacuna: new forms_1.FormControl(Math.floor(1000000 + Math.random() * 900000000)),
            vremeIzdavanja: new forms_1.FormControl(new Date),
            ukupanIznos: new forms_1.FormControl(0)
        });
        this.url = 'https://localhost:44302';
        this.stavke = [];
    }
    RacunService.prototype.getRacunaIStavki = function (sifra) {
        return this.http.get(this.url + '/api/Racuns/detalji/' + sifra);
    };
    RacunService.prototype.getSvihBarkodova = function (sifra) {
        return this.http.get(this.url + '/api/StavkaRacunas/barkods/' + sifra);
    };
    RacunService.prototype.getVrstePoBarkodu = function (barkod) {
        return this.http.get(this.url + '/api/VrstaProizvodas/' + barkod);
    };
    RacunService.prototype.stanjeRacuna = function (id) {
        return this.http.get(this.url + '/api/StavkaRacunas/stavka/' + id);
    };
    RacunService.prototype.getStavkePoSifri = function (sifra) {
        return this.http.get(this.url + '/api/StavkaRacunas/racun/' + sifra);
    };
    RacunService.prototype.getStavkePoBarkodu = function (sifra, barkod) {
        return this.http.get(this.url + ("/api/StavkaRacunas/" + sifra + "/" + barkod));
    };
    RacunService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RacunService);
    return RacunService;
}());
exports.RacunService = RacunService;
//# sourceMappingURL=racun.service.js.map