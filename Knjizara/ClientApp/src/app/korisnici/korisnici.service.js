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
var KorisniciService = /** @class */ (function () {
    function KorisniciService(http) {
        this.http = http;
        this.url = 'https://localhost:44302';
        this.loginForm = new forms_1.FormGroup({
            korisnickoIme: new forms_1.FormControl('', forms_1.Validators.required),
            lozinka: new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    KorisniciService.prototype.getSvihKorisnika = function () {
        return this.http.get(this.url + '/api/Korisniks');
    };
    KorisniciService.prototype.deleteKorisnika = function (id) {
        return this.http.delete(this.url + '/api/Korisniks/' + id);
    };
    KorisniciService.prototype.getKorisnikById = function (id) {
        return this.http.get(this.url + '/api/Korisniks/' + id);
    };
    KorisniciService.prototype.putKorisnika = function (id, korisnik) {
        var reqHeader = new http_1.HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        return this.http.put(this.url + '/api/Korisniks/' + id, korisnik, { headers: reqHeader });
    };
    KorisniciService.prototype.logovanje = function (formData) {
        return this.http.post(this.url + '/api/Korisniks/login', formData);
    };
    KorisniciService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], KorisniciService);
    return KorisniciService;
}());
exports.KorisniciService = KorisniciService;
//# sourceMappingURL=korisnici.service.js.map