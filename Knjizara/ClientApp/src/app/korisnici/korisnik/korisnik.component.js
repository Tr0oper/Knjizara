"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var KorisnikComponent = /** @class */ (function () {
    function KorisnikComponent(service, toastr, dialogRef) {
        this.service = service;
        this.toastr = toastr;
        this.dialogRef = dialogRef;
    }
    KorisnikComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getSvihRola().subscribe(function (data) {
            _this.role = data;
        });
    };
    KorisnikComponent.prototype.onSubmit = function () {
        var _this = this;
        var ime = this.service.korisnikForm.get('korisnickoIme').value;
        // uvecavamo dan na izabranom datumu posto prikazuje za jedan dan manje od izabranog
        var datum = this.service.korisnikForm.get('datumRodjenja').value;
        datum.setDate(datum.getDate() + 1);
        this.service.korisnikForm.patchValue({ datumRodjenja: datum });
        this.service.postKorisnika(this.service.korisnikForm.value).subscribe(function (data) {
            _this.toastr.success('Korisnik ' + ime + ' je uspesno registrovan', 'Knjizara');
            _this.service.korisnikForm.reset();
            _this.service.korisnikForm.patchValue({ korisnikId: 0 });
        }, function (error) {
            _this.toastr.warning('Doslo je do greske', 'Knjizara');
            console.log(error);
        });
        this.onClose();
    };
    KorisnikComponent.prototype.onClose = function () {
        this.service.korisnikForm.reset();
        this.dialogRef.close();
    };
    KorisnikComponent = __decorate([
        core_1.Component({
            selector: 'app-korisnik',
            templateUrl: './korisnik.component.html',
            styleUrls: ['./korisnik.component.css']
        })
    ], KorisnikComponent);
    return KorisnikComponent;
}());
exports.KorisnikComponent = KorisnikComponent;
//# sourceMappingURL=korisnik.component.js.map