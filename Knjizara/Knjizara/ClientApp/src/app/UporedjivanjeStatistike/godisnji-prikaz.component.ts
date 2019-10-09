import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StatistikaService } from '../HomePage/statistika.service';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'querystring';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-godisnji-prikaz',
  templateUrl: './godisnji-prikaz.component.html',
  styleUrls: ['./godisnji-prikaz.component.css']
})
export class GodisnjiPrikazComponent implements OnInit {

  chart
  polarArea = [];
  god: number
  godine: number[]
  manjeJedna: number

  constructor(
    private service: StatistikaService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getSvihGodinaRacuna().subscribe(data => {
      let pom = this.route.snapshot.paramMap.get('godina')
      let pom1 = parseInt(pom) - 1
      this.godine = data
      for (let i = 0; i < data.length; i++) {
        
        console.log(data[i])
        console.log('Godina' + ' - ' + parseInt(pom))
        if (parseInt(pom) === data[i]) {


          this.service.getZaradePoMesecimaZaGodinu(parseInt(pom)).subscribe(x => {
            let zarade = x.map(z => z.zarada)
            let meseci = x.map(m => m.mesec)
            this.service.getZaradePoMesecimaZaGodinu(pom1).subscribe(y => {
              let zaradaP = y.map(zp => zp.zarada)
              let meseciP = y.map(zm => zm.mesec)
              this.god = parseInt(pom)
              this.manjeJedna = pom1

              this.chart = new Chart('canvas', {
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
              })
            })
          })


          console.log('Prosledjena god: ' + parseInt(pom) + ' i godina za jedan manja: ' + pom1)
          break
        }
        else {
          
          console.log('Godina koja je za jedan manja od izabrane ne postoji u bazi!')
        }
      }
    })

    this.chart.destroy()
  }

  prosekZarade(god) {
    
    
    this.service.getSvihGodinaRacuna().subscribe(data => {
      let pom = god
      let pom1 = parseInt(pom) - 1
      for (let i = 0; i < data.length; i++) {

        console.log(data[i])
        console.log('Godina' + ' - ' + parseInt(pom))
        if (parseInt(pom) === data[i]) {


          this.service.getZaradePoMesecimaZaGodinu(parseInt(pom)).subscribe(x => {
            let zarade = x.map(z => z.zarada)
            let meseci = x.map(m => m.mesec)
            this.service.getZaradePoMesecimaZaGodinu(pom1).subscribe(y => {
              let zaradaP = y.map(zp => zp.zarada)
              let meseciP = y.map(zm => zm.mesec)
              this.god = parseInt(pom)
              this.manjeJedna = pom1

              this.chart = new Chart('canvas', {
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
              })
            })
          })


          console.log('Prosledjena god: ' + parseInt(pom) + ' i godina za jedan manja: ' + pom1)
          break
        }
        else {

          console.log('Godina koja je za jedan manja od izabrane ne postoji u bazi!')
        }
      }
    })

    this.chart.destroy()
  }

  //onClose() {
  //  this.dialogRef.close()
  //}
}



  
