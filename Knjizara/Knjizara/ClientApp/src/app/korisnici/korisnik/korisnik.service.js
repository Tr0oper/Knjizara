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
var http_1 = require("@angular/common/http");
var KorisnikService = /** @class */ (function () {
    function KorisnikService(http) {
        this.http = http;
        this.url = 'https://localhost:44302';
        this.korisnikForm = new forms_1.FormGroup({
            korisnikId: new forms_1.FormControl(0),
            korisnickoIme: new forms_1.FormControl('', forms_1.Validators.required),
            mail: new forms_1.FormControl('', forms_1.Validators.required),
            ime: new forms_1.FormControl('', forms_1.Validators.required),
            prezime: new forms_1.FormControl('', forms_1.Validators.required),
            lozinka: new forms_1.FormControl('', forms_1.Validators.required),
            datumRodjenja: new forms_1.FormControl(Date, forms_1.Validators.required),
            pol: new forms_1.FormControl('', forms_1.Validators.required),
            telefon: new forms_1.FormControl('', forms_1.Validators.required),
            plata: new forms_1.FormControl(0, forms_1.Validators.required),
            rolaId: new forms_1.FormControl(0, forms_1.Validators.required)
        });
        this.detaljiForm = new forms_1.FormGroup({
            korisnikId: new forms_1.FormControl(0),
            korisnickoIme: new forms_1.FormControl('', forms_1.Validators.required),
            mail: new forms_1.FormControl('', forms_1.Validators.required),
            ime: new forms_1.FormControl('', forms_1.Validators.required),
            prezime: new forms_1.FormControl('', forms_1.Validators.required),
            lozinka: new forms_1.FormControl('', forms_1.Validators.required),
            datumRodjenja: new forms_1.FormControl(Date, forms_1.Validators.required),
            pol: new forms_1.FormControl('', forms_1.Validators.required),
            telefon: new forms_1.FormControl('', forms_1.Validators.required),
            plata: new forms_1.FormControl(null, forms_1.Validators.required),
            rolaId: new forms_1.FormControl(null, forms_1.Validators.required)
        });
    }
    KorisnikService.prototype.getSvihRola = function () {
        return this.http.get(this.url + '/api/Rolas');
    };
    KorisnikService.prototype.postKorisnika = function (korisnik) {
        var reqHeader = new http_1.HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        return this.http.post(this.url + '/api/Korisniks', korisnik, { headers: reqHeader });
    };
    KorisnikService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], KorisnikService);
    return KorisnikService;
}());
exports.KorisnikService = KorisnikService;
//# sourceMappingURL=korisnik.service.js.map