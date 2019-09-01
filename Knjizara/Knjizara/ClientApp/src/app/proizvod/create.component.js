"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CreateComponent = /** @class */ (function () {
    function CreateComponent(proizvodService, toastr, dialogRef) {
        this.proizvodService = proizvodService;
        this.toastr = toastr;
        this.dialogRef = dialogRef;
    }
    CreateComponent.prototype.ngOnInit = function () {
    };
    CreateComponent.prototype.onSubmit = function () {
        var _this = this;
        this.proizvodService.postProizvoda(this.proizvodService.form.value)
            .subscribe(function (data) {
            _this.toastr.success('Proizvod uspesno dodat', 'Knjizara');
            _this.proizvodService.form.reset();
        }, function (error) { _this.toastr.warning('Doslo je do greske, proizovd sa unetim ID-em postoji u bazi', 'Knjizara'); });
        this.onClose();
    };
    CreateComponent.prototype.onClose = function () {
        this.proizvodService.form.reset();
        this.dialogRef.close();
    };
    CreateComponent = __decorate([
        core_1.Component({
            selector: 'app-create',
            templateUrl: './create.component.html',
            styleUrls: ['./create.component.css']
        })
    ], CreateComponent);
    return CreateComponent;
}());
exports.CreateComponent = CreateComponent;
//# sourceMappingURL=create.component.js.map