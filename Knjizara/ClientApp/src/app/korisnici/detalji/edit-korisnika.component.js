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
var EditKorisnikaComponent = /** @class */ (function () {
    function EditKorisnikaComponent(service, korisnikService, route, toastr, router, dialogRef, data) {
        this.service = service;
        this.korisnikService = korisnikService;
        this.route = route;
        this.toastr = toastr;
        this.router = router;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    EditKorisnikaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.korisnikService.getSvihRola().subscribe(function (znj) { return _this.role = znj; });
        var korisnikId = this.data.korisnikId;
        this.service.getKorisnikById(korisnikId).subscribe(function (data) {
            _this.korisnikService.detaljiForm.patchValue({
                korisnikId: data.korisnikId,
                ime: data.ime,
                prezime: data.prezime,
                korisnickoIme: data.korisnickoIme,
                lozinka: data.lozinka,
                mail: data.mail,
                datumRodjenja: data.datumRodjenja,
                pol: data.pol,
                telefon: data.telefon,
                plata: data.plata,
                rolaId: data.rolaId
            });
            _this.selected = data.rolaId.toString();
            _this.korisnickoIme = data.korisnickoIme;
        });
    };
    EditKorisnikaComponent.prototype.onSubmit = function () {
        var _this = this;
        var korisnikId = this.data.korisnikId;
        var korisnickoIme = this.korisnikService.detaljiForm.get('korisnickoIme').value;
        this.service.putKorisnika(korisnikId, this.korisnikService.detaljiForm.value).subscribe(function (x) {
            _this.toastr.success('Podaci o korisniku ' + korisnickoIme + ' su uspesno izmenjeni', 'Knjizara');
            _this.router.navigate(['/korisnici']);
        }, function (error) { _this.toastr.warning('Doslo je do greske: ' + error, 'Knjizara'); });
        this.onClose();
    };
    EditKorisnikaComponent.prototype.onClose = function () {
        this.korisnikService.detaljiForm.reset();
        this.dialogRef.close();
    };
    EditKorisnikaComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-korisnika',
            templateUrl: './edit-korisnika.component.html',
            styleUrls: ['./edit-korisnika.component.css']
        }),
        __param(6, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], EditKorisnikaComponent);
    return EditKorisnikaComponent;
}());
exports.EditKorisnikaComponent = EditKorisnikaComponent;
//# sourceMappingURL=edit-korisnika.component.js.map