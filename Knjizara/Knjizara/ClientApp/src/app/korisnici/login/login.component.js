"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(service, router, toastr) {
        this.service = service;
        this.router = router;
        this.toastr = toastr;
        this.hide = true;
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (sessionStorage.getItem('token') != null) {
            this.router.navigate(['/home']);
        }
    };
    LoginComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.service.logovanje(form.value).subscribe(function (res) {
            sessionStorage.setItem('token', res.token);
            sessionStorage.setItem('rola', res.ulogovanKorisnik.rolaId);
            _this.toastr.success('Uspesno ste se ulogovali', 'Knjizara');
            _this.router.navigate(['/home']);
        }, function (error) {
            _this.toastr.error('Uneto korisnicko ime ili lozinka su pogresni!', 'Knjizara');
        });
        this.service.loginForm.reset();
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map