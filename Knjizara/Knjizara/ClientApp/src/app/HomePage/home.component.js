"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var chart_js_1 = require("chart.js");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(service) {
        this.service = service;
        this.timerId = null;
        this.displayedColumns = ['mesec', 'zarada'];
        this.kolone = ['sifraRacuna', 'vremeIzdavanja', 'ukupanIznos'];
        this.linijski = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.isMenadzer()) {
            this.service.getSvihGodinaIzdatihRacuna().subscribe(function (data) {
                _this.godine = data;
                _this.service.zaradaNaDnevnomNivou().subscribe(function (data) {
                    _this.datum = Date.now();
                    _this.pazar = data[0].zarada;
                });
                _this.service.dnevniRacuni().subscribe(function (data) {
                    _this.dataSource = new material_1.MatTableDataSource(data);
                });
            });
        }
        if (this.isRadnik()) {
            this.service.racuniSvakogSata().subscribe(function (data) {
                var sati = data.map(function (s) { return s.sat; });
                var zarada = data.map(function (z) { return z.zarada; });
                _this.linijski = new chart_js_1.Chart('linijski', {
                    type: 'line',
                    data: {
                        labels: sati,
                        datasets: [
                            {
                                data: zarada,
                                borderColor: '#b30404',
                                fill: true,
                                backgroundColor: 'rgba(32, 34, 38, 0.5)',
                                pointRadius: 4,
                                pointBackgroundColor: '#b30404',
                                pointBorderColor: '#fff'
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false
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
            this.service.zaradaNaDnevnomNivou().subscribe(function (data) {
                _this.datum = Date.now();
                _this.pazar = data[0].zarada;
            });
            this.service.dnevniRacuni().subscribe(function (data) {
                _this.dataSource = new material_1.MatTableDataSource(data);
            });
            this.setCurrentTime();
            this.timerId = this.updateTime();
        }
    };
    HomeComponent.prototype.setCurrentTime = function () {
        var time = new Date(Date.now());
        this.hours = this.leftPadZero(time.getHours());
        this.minutes = this.leftPadZero(time.getMinutes());
        this.seconds = this.leftPadZero(time.getSeconds());
    };
    HomeComponent.prototype.updateTime = function () {
        var _this = this;
        setInterval(function () {
            _this.setCurrentTime();
        }, 1000);
    };
    HomeComponent.prototype.leftPadZero = function (value) {
        return value < 10 ? "0" + value : value.toString();
    };
    HomeComponent.prototype.prosekZarade = function (godina) {
        var _this = this;
        this.service.getZaradePoMesecimaZaGodinu(godina).subscribe(function (data) {
            _this.godina = godina;
            var meseci = data.map(function (r) { return r.mesec; });
            var zarade = data.map(function (r) { return r.zarada; });
            _this.chart = new chart_js_1.Chart('canvas', {
                type: 'line',
                data: {
                    labels: meseci,
                    datasets: [
                        {
                            data: zarade,
                            borderColor: '#b30404',
                            fill: true,
                            backgroundColor: 'rgba(32, 34, 38, 0.5)',
                            pointRadius: 4,
                            pointBackgroundColor: '#b30404',
                            pointBorderColor: '#fff'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false
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
        this.service.ukupnaZaradaIzabraneGodine(godina).subscribe(function (data) {
            _this.ukupnaZarada = data[0].ukupnaZarada;
        });
        this.chart.destroy();
    };
    HomeComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    HomeComponent.prototype.isRadnik = function () {
        var rola = sessionStorage.getItem('rola');
        if (rola === "2")
            return true;
        else
            return false;
    };
    HomeComponent.prototype.isMenadzer = function () {
        var rola = sessionStorage.getItem('rola');
        if (rola === "1")
            return true;
        else
            return false;
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map