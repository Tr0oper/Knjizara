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
var GodisnjiObracun = /** @class */ (function () {
    function GodisnjiObracun() {
    }
    GodisnjiObracun = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], GodisnjiObracun);
    return GodisnjiObracun;
}());
exports.GodisnjiObracun = GodisnjiObracun;
var DnevniPazar = /** @class */ (function () {
    function DnevniPazar() {
    }
    return DnevniPazar;
}());
exports.DnevniPazar = DnevniPazar;
var StatistikaService = /** @class */ (function () {
    function StatistikaService(http) {
        this.http = http;
        this.url = 'https://localhost:44302';
        this.statistikaForm = new forms_1.FormGroup({
            godina: new forms_1.FormControl(0)
        });
    }
    StatistikaService.prototype.getZaradePoMesecimaZaGodinu = function (goidna) {
        return this.http.get(this.url + '/api/Statistika/' + goidna);
    };
    StatistikaService.prototype.getSvihGodinaRacuna = function () {
        return this.http.get(this.url + '/api/Statistika');
    };
    StatistikaService.prototype.ukupnaZaradaIzabraneGodine = function (godina) {
        return this.http.get(this.url + '/api/Statistika/zarada/' + godina);
    };
    StatistikaService.prototype.zaradaNaDnevnomNivou = function () {
        return this.http.get(this.url + '/api/Statistika/pazar');
    };
    StatistikaService.prototype.dnevniRacuni = function () {
        return this.http.get(this.url + '/api/Statistika/racuni');
    };
    return StatistikaService;
}());
exports.StatistikaService = StatistikaService;
//# sourceMappingURL=statistika.service.js.map