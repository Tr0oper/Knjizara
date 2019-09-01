import { Component, OnInit, ViewChild } from '@angular/core';
import { StatistikaService } from './statistika.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Statistika } from '../Model/statistika.model';
import { Racun } from '../Model/racun.model';
import { AssertNotNull } from '@angular/compiler';

type NewType = MatSort;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hours: string;
  minutes: string;
  seconds: string;
  private timerId = null;

  godine: number
  godina: number
  ukupnaZarada: number
  datum: number
  pazar: number
  displayedColumns = ['mesec', 'zarada'];

  dataSource: MatTableDataSource<any>

  kolone = ['sifraRacuna', 'vremeIzdavanja', 'ukupanIznos']
  
  constructor(private service: StatistikaService) {
    
  }

  ngOnInit() {
    if (this.isMenadzer()) {
      this.service.getSvihGodinaRacuna().subscribe(data => {
        this.godine = data

        this.service.zaradaNaDnevnomNivou().subscribe(data => {
          this.datum = Date.now();
          this.pazar = data[0].zarada
        })

        this.service.dnevniRacuni().subscribe(data => {
          console.log(data)
          this.dataSource = new MatTableDataSource(data)
        })
      })
    }

    if (this.isRadnik()) {
      this.service.zaradaNaDnevnomNivou().subscribe(data => {
        this.datum = Date.now();
        this.pazar = data[0].zarada
      })

      this.service.dnevniRacuni().subscribe(data => {
        console.log(data)
        this.dataSource = new MatTableDataSource(data)
      })

      this.setCurrentTime();
      this.timerId = this.updateTime();
    }
  }

  private setCurrentTime() {
    const time = new Date(Date.now());
    this.hours = this.leftPadZero(time.getHours());
    this.minutes = this.leftPadZero(time.getMinutes());
    this.seconds = this.leftPadZero(time.getSeconds());
  }

  private updateTime() {
    setInterval(() => {
      this.setCurrentTime();
    }, 1000);
  }

  private leftPadZero(value: number) {
    return value < 10 ? `0${value}` : value.toString();
  }

  prosekZarade(godina) {
    this.service.getZaradePoMesecimaZaGodinu(godina).subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.godina = godina
    })
    this.service.ukupnaZaradaIzabraneGodine(godina).subscribe(data => {
      this.ukupnaZarada = data[0].ukupnaZarada
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isRadnik() {
    const rola = sessionStorage.getItem('rola');
    if (rola === "2")
      return true
    else
      return false
  }

  isMenadzer() {
    const rola = sessionStorage.getItem('rola');
    if (rola === "1")
      return true
    else
      return false
  }

}
