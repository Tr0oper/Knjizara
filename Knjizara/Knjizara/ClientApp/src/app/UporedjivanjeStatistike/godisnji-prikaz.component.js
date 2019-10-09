"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var chart_js_1 = require("chart.js");
var GodisnjiPrikazComponent = /** @class */ (function () {
    function GodisnjiPrikazComponent(service, route, toastr) {
        this.service = service;
        this.route = route;
        this.toastr = toastr;
        this.polarArea = [];
    }
    GodisnjiPrikazComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getSvihGodinaRacuna().subscribe(function (data) {
            var pom = _this.route.snapshot.paramMap.get('godina');
            var pom1 = parseInt(pom) - 1;
            _this.godine = data;
            for (var i = 0; i < data.length; i++) {
                console.log(data[i]);
                console.log('Godina' + ' - ' + parseInt(pom));
                if (parseInt(pom) === data[i]) {
                    _this.service.getZaradePoMesecimaZaGodinu(parseInt(pom)).subscribe(function (x) {
                        var zarade = x.map(function (z) { return z.zarada; });
                        var meseci = x.map(function (m) { return m.mesec; });
                        _this.service.getZaradePoMesecimaZaGodinu(pom1).subscribe(function (y) {
                            var zaradaP = y.map(function (zp) { return zp.zarada; });
                            var meseciP = y.map(function (zm) { return zm.mesec; });
                            _this.god = parseInt(pom);
                            _this.manjeJedna = pom1;
                            _this.chart = new chart_js_1.Chart('canvas', {
                                type: 'bar',
                                data: {
                                    labels: meseci,
                                    datasets: [
                                        {
                                            data: zarade,
                                            backgroundColor: 'rgba(171, 3, 3, 0.4)',
                                            label: parseInt(pom)
                                        },
                                        {
                                            data: zaradaP,
                                            backgroundColor: 'rgba(181, 112, 14, 0.4)',
                                            label: pom1
                                        }
                                    ]
                                },
                                options: {
                                    responsive: true,
                                    legend: {
                                        display: true,
                                        labels: {
                                            fontColor: 'rgb(255, 99, 132)'
                                        }
                                    },
                                    scales: {
                                        xAxes: [{
                                                display: true,
                                                gridLines: {
                                                    display: true,
                                                    color: "#464d59"
                                                },
                                                ticks: {
                                                    fontColor: "#CCC",
                                                },
                                            }],
                                        yAxes: [{
                                                display: true,
                                                gridLines: {
                                                    display: true,
                                                    color: "#464d59"
                                                },
                                                ticks: {
                                                    fontColor: "#CCC",
                                                },
                                            }]
                                    }
                                }
                            });
                        });
                    });
                    console.log('Prosledjena god: ' + parseInt(pom) + ' i godina za jedan manja: ' + pom1);
                    break;
                }
                else {
                    console.log('Godina koja je za jedan manja od izabrane ne postoji u bazi!');
                }
            }
        });
        this.chart.destroy();
    };
    GodisnjiPrikazComponent.prototype.prosekZarade = function (god) {
        var _this = this;
        this.service.getSvihGodinaRacuna().subscribe(function (data) {
            var pom = god;
            var pom1 = parseInt(pom) - 1;
            for (var i = 0; i < data.length; i++) {
                console.log(data[i]);
                console.log('Godina' + ' - ' + parseInt(pom));
                if (parseInt(pom) === data[i]) {
                    _this.service.getZaradePoMesecimaZaGodinu(parseInt(pom)).subscribe(function (x) {
                        var zarade = x.map(function (z) { return z.zarada; });
                        var meseci = x.map(function (m) { return m.mesec; });
                        _this.service.getZaradePoMesecimaZaGodinu(pom1).subscribe(function (y) {
                            var zaradaP = y.map(function (zp) { return zp.zarada; });
                            var meseciP = y.map(function (zm) { return zm.mesec; });
                            _this.god = parseInt(pom);
                            _this.manjeJedna = pom1;
                            _this.chart = new chart_js_1.Chart('canvas', {
                                type: 'bar',
                                data: {
                                    labels: meseci,
                                    datasets: [
                                        {
                                            data: zarade,
                                            backgroundColor: 'rgba(171, 3, 3, 0.4)',
                                            label: parseInt(pom)
                                        },
                                        {
                                            data: zaradaP,
                                            backgroundColor: 'rgba(181, 112, 14, 0.4)',
                                            label: pom1
                                        }
                                    ]
                                },
                                options: {
                                    responsive: true,
                                    legend: {
                                        display: true,
                                        labels: {
                                            fontColor: 'rgb(255, 99, 132)'
                                        }
                                    },
                                    scales: {
                                        xAxes: [{
                                                display: true,
                                                gridLines: {
                                                    display: true,
                                                    color: "#464d59"
                                                },
                                                ticks: {
                                                    fontColor: "#CCC",
                                                },
                                            }],
                                        yAxes: [{
                                                display: true,
                                                gridLines: {
                                                    display: true,
                                                    color: "#464d59"
                                                },
                                                ticks: {
                                                    fontColor: "#CCC",
                                                },
                                            }]
                                    }
                                }
                            });
                        });
                    });
                    console.log('Prosledjena god: ' + parseInt(pom) + ' i godina za jedan manja: ' + pom1);
                    break;
                }
                else {
                    console.log('Godina koja je za jedan manja od izabrane ne postoji u bazi!');
                }
            }
        });
        this.chart.destroy();
    };
    GodisnjiPrikazComponent = __decorate([
        core_1.Component({
            selector: 'app-godisnji-prikaz',
            templateUrl: './godisnji-prikaz.component.html',
            styleUrls: ['./godisnji-prikaz.component.css']
        })
    ], GodisnjiPrikazComponent);
    return GodisnjiPrikazComponent;
}());
exports.GodisnjiPrikazComponent = GodisnjiPrikazComponent;
//# sourceMappingURL=godisnji-prikaz.component.js.map