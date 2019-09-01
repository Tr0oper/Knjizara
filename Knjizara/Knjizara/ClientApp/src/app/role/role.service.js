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
var RoleService = /** @class */ (function () {
    function RoleService(http) {
        this.http = http;
        this.url = 'https://localhost:44302';
        this.roleForm = new forms_1.FormGroup({
            rolaId: new forms_1.FormControl(0),
            naziv: new forms_1.FormControl('')
        });
        this.roleCreate = new forms_1.FormGroup({
            rolaId: new forms_1.FormControl(0),
            naziv: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.detaljiRole = new forms_1.FormGroup({
            rolaId: new forms_1.FormControl(0),
            naziv: new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    RoleService.prototype.getSvihRola = function () {
        return this.http.get(this.url + '/api/Rolas');
    };
    RoleService.prototype.deleteRole = function (id) {
        return this.http.delete(this.url + '/api/Rolas/' + id);
    };
    RoleService.prototype.postRole = function (rola) {
        var reqHeader = new http_1.HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        return this.http.post(this.url + '/api/Rolas', rola, { headers: reqHeader });
    };
    RoleService.prototype.putRole = function (rola) {
        var reqHeader = new http_1.HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        return this.http.put(this.url + '/api/Rolas/' + rola.rolaId, rola, { headers: reqHeader });
    };
    RoleService.prototype.getRoleById = function (id) {
        return this.http.get(this.url + '/api/Rolas/' + id);
    };
    RoleService.prototype.getKorisnikaById = function (id) {
        return this.http.get(this.url + '/api/Rolas/korisnik/' + id);
    };
    RoleService.prototype.deleteKorisnika = function (id) {
        return this.http.delete(this.url + '/api/Korisniks/' + id);
    };
    RoleService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RoleService);
    return RoleService;
}());
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map