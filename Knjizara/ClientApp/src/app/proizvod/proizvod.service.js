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
var ProizvodService = /** @class */ (function () {
    function ProizvodService(http) {
        this.http = http;
        this.url = 'https://localhost:44302';
        this.form = new forms_1.FormGroup({
            proizvodId: new forms_1.FormControl(null, forms_1.Validators.required),
            naziv: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.formUpdate = new forms_1.FormGroup({
            proizvodId: new forms_1.FormControl(null),
            naziv: new forms_1.FormControl('')
        });
        this.detailForm = new forms_1.FormGroup({
            proizvodId: new forms_1.FormControl(null),
            naziv: new forms_1.FormControl('')
        });
    }
    ProizvodService.prototype.getSvihProizvoda = function () {
        return this.http.get(this.url + '/api/Proizvods');
    };
    ProizvodService.prototype.getProizvodById = function (id) {
        return this.http.get(this.url + '/api/Proizvods/' + id);
    };
    ProizvodService.prototype.postProizvoda = function (proizvod) {
        var reqHeader = new http_1.HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        return this.http.post(this.url + '/api/Proizvods', proizvod, { headers: reqHeader });
    };
    ProizvodService.prototype.deleteProizvoda = function (id) {
        return this.http.delete(this.url + '/api/Proizvods/' + id);
    };
    ProizvodService.prototype.putProizvoda = function (proizvod) {
        var reqHeader = new http_1.HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        return this.http.put(this.url + '/api/Proizvods/' + proizvod.proizvodId, proizvod, { headers: reqHeader });
    };
    ProizvodService.prototype.getVrstePoIdProizvoda = function (id) {
        return this.http.get(this.url + '/api/VrstaProizvodas/proizvod/' + id);
    };
    ProizvodService = __decorate([
        core_1.Injectable()
    ], ProizvodService);
    return ProizvodService;
}());
exports.ProizvodService = ProizvodService;
//# sourceMappingURL=proizvod.service.js.map