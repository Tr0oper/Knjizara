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
var VrstaProizvodaService = /** @class */ (function () {
    function VrstaProizvodaService(http) {
        this.http = http;
        this.url = 'https://localhost:44302';
        this.formUpdate = new forms_1.FormGroup({
            barkod: new forms_1.FormControl(null),
            naziv: new forms_1.FormControl(''),
            cena: new forms_1.FormControl(null),
            kolicina: new forms_1.FormControl(null),
            proizvodjac: new forms_1.FormControl(''),
            zemljaPorekla: new forms_1.FormControl(''),
            proizvodId: new forms_1.FormControl(null)
        });
        this.createForm = new forms_1.FormGroup({
            barkod: new forms_1.FormControl(null, forms_1.Validators.required),
            naziv: new forms_1.FormControl('', forms_1.Validators.required),
            cena: new forms_1.FormControl(null, forms_1.Validators.required),
            kolicina: new forms_1.FormControl(null, forms_1.Validators.required),
            proizvodjac: new forms_1.FormControl('', forms_1.Validators.required),
            zemljaPorekla: new forms_1.FormControl('', forms_1.Validators.required),
            proizvodId: new forms_1.FormControl(0, forms_1.Validators.required)
        });
    }
    VrstaProizvodaService.prototype.getSvihVrsta = function () {
        return this.http.get(this.url + '/api/VrstaProizvodas');
    };
    VrstaProizvodaService.prototype.getVrstePoIdProizvoda = function (id) {
        return this.http.get(this.url + '/api/VrstasProizvoda/proizvod/' + id);
    };
    VrstaProizvodaService.prototype.putVrste = function (vrsta) {
        var reqHeader = new http_1.HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        return this.http.put(this.url + '/api/VrstaProizvodas/' + vrsta.barkod, vrsta, { headers: reqHeader });
    };
    VrstaProizvodaService.prototype.postVrste = function (vrsta) {
        var reqHeader = new http_1.HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        return this.http.post(this.url + '/api/VrstaProizvodas', vrsta, { headers: reqHeader });
    };
    VrstaProizvodaService.prototype.deleteVrsta = function (barkod) {
        return this.http.delete(this.url + '/api/VrstaProizvodas/' + barkod);
    };
    VrstaProizvodaService.prototype.getSvihProizvoda = function () {
        return this.http.get(this.url + '/api/Proizvods');
    };
    VrstaProizvodaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], VrstaProizvodaService);
    return VrstaProizvodaService;
}());
exports.VrstaProizvodaService = VrstaProizvodaService;
//# sourceMappingURL=vrsta-proizvoda.service.js.map