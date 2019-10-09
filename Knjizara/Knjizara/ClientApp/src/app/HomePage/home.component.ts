import { Component, OnInit, ViewChild } from '@angular/core';
import { StatistikaService } from './statistika.service';
import { MatTableDataSource, MatSort, MatDialogConfig } from '@angular/material';
import { MatDialog } from '@angular/material/dialog'
import { Chart } from 'chart.js';
import { GodisnjiPrikazComponent } from '../UporedjivanjeStatistike/godisnji-prikaz.component';

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

  chart
  linijski = [];
  
  constructor(private service: StatistikaService,
    ) {
    
  }

  ngOnInit() {
    if (this.isMenadzer()) {
      this.service.getSvihGodinaIzdatihRacuna().subscribe(data => {
        this.godine = data
        
        this.service.zaradaNaDnevnomNivou().subscribe(data => {
          this.datum = Date.now();
          this.pazar = data[0].zarada
        })

        this.service.dnevniRacuni().subscribe(data => {
          this.dataSource = new MatTableDataSource(data)
        })
      })

    }

    if (this.isRadnik()) {
      this.service.racuniSvakogSata().subscribe(data => {
        let sati = data.map(s => s.sat)
        let zarada = data.map(z => z.zarada)

        this.linijski = new Chart('linijski', {
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
                  fontColor: "#CCC", // this here
                },
              }],
              yAxes: [{
                display: true,
                gridLines: {
                  display: true,
                  color: "#464d59"
                },
                ticks: {
                  fontColor: "#CCC", // this here
                },
              }]
            }
          }
        })

      })




      this.service.zaradaNaDnevnomNivou().subscribe(data => {
        this.datum = Date.now();
        this.pazar = data[0].zarada
      })

      this.service.dnevniRacuni().subscribe(data => {
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
      this.godina = godina
      let meseci = data.map(r => r.mesec)
      let zarade = data.map(r => r.zarada)

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: meseci,
          datasets: [
            {
              data: zarade,
              borderColor: '#b30404',
              fill: true,
              backgroundColor: 'rgba(32, 34, 38, 0.5)' ,
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
                fontColor: "#CCC", // this here
              },
            }],
            yAxes: [{
              display: true,
              gridLines: {
                display: true,
                color: "#464d59"
              },
              ticks: {
                fontColor: "#CCC", // this here
              },
            }]
          }
        }
      })
     
    })
    this.service.ukupnaZaradaIzabraneGodine(godina).subscribe(data => {
      this.ukupnaZarada = data[0].ukupnaZarada
    })
    this.chart.destroy()
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
