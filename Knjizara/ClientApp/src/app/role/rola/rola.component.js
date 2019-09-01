"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RolaComponent = /** @class */ (function () {
    function RolaComponent(service, toastr, dialogRef) {
        this.service = service;
        this.toastr = toastr;
        this.dialogRef = dialogRef;
    }
    RolaComponent.prototype.ngOnInit = function () {
    };
    RolaComponent.prototype.onSubmit = function () {
        var _this = this;
        this.service.postRole(this.service.roleCreate.value).subscribe(function (data) {
            _this.toastr.success('Rola je uspesno dodata', 'Knjizara');
        }, function (error) {
            _this.toastr.warning('Doslo je do greske', 'Knjizara');
            console.log(error);
        });
        this.onClose();
    };
    RolaComponent.prototype.onClose = function () {
        this.service.roleCreate.reset();
        this.dialogRef.close();
    };
    RolaComponent = __decorate([
        core_1.Component({
            selector: 'app-rola',
            templateUrl: './rola.component.html',
            styleUrls: ['./rola.component.css']
        })
    ], RolaComponent);
    return RolaComponent;
}());
exports.RolaComponent = RolaComponent;
//# sourceMappingURL=rola.component.js.map