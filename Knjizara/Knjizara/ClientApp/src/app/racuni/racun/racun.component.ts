import { Component, OnInit, Inject } from '@angular/core';
import { RacunService } from './racun.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StavkeRacunaComponent } from '../stavke-racuna/stavke-racuna.component';
import { Router, ActivatedRoute } from '@angular/router';
import { StavkeRacunaService } from '../stavke-racuna/stavke-racuna.service';
import { ToastrService } from 'ngx-toastr';
import { StavkaRacuna } from '../../Model/stavkaRacuna.model';
import { RacuniService } from '../racuni.service';
import { parse } from 'querystring';
import { FormGroup, FormControl } from '@angular/forms';
import { VrsteProizvoda } from '../../Model/vrstaProizvoda.model';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit {


  constructor(private service: RacunService,
    private racuniService: RacuniService,
    private dialog: MatDialog,
    private stavkaService: StavkeRacunaService,
    private route: Router,
    private toastr: ToastrService,
    private router: ActivatedRoute

  ) { }

  stavke: StavkaRacuna[];

  ngOnInit() {

      

    let sifraRacuna = this.router.snapshot.paramMap.get('sifraRacuna');
    if (sifraRacuna == null) {
      this.stavkaService.stavkaForm = new FormGroup({
        stavkaRacunaId: new FormControl(0),
        sifraRacuna: new FormControl(this.service.detailForm.get('sifraRacuna').value),
        kolicina: new FormControl(0),
        cenaPoJedinici: new FormControl(0),
        barkod: new FormControl(0),
        naziv: new FormControl(''),
        ukupno: new FormControl(0)
      });
    }
    else {
      this.racuniService.getRacunaBySifra(parseInt(sifraRacuna)).subscribe(data => {
        this.service.detailForm.setValue({ sifraRacuna: data.sifraRacuna, vremeIzdavanja: data.vremeIzdavanja, ukupanIznos: data.ukupanIznos })
        this.stavkaService.getStavkePoSifri(parseInt(sifraRacuna)).subscribe(data => {
          this.service.getSvihBarkodova(parseInt(sifraRacuna)).subscribe(x => {
            for (let i = 0; i < 50; i++) {
              if (x[i] != null) {
                this.service.getVrstePoBarkodu(x[i]).subscribe(y => {
                  data[i].naziv = y.naziv
                  data[i].ukupno = data[i].kolicina * y.cena
                  this.service.stavke = data
                })
              }
            }
          })
        })
      })
    }
  }

  AddOrEdit(stavkaRacunaIndex, sifraRacuna) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { stavkaRacunaIndex, sifraRacuna };
    this.dialog.open(StavkeRacunaComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateSume()
      
    })

  }

  suma: number

  updateSume() {
    
    this.service.detailForm.patchValue({ ukupanIznos: this.service.stavke.reduce((prev, curr) => { return prev + curr.ukupno }, 0) })

  }

  onDeleteStavkaRacuna(stavkaRacunaId: number, i: number) {

    this.stavkaService.getStavkePoBarkodu(this.service.stavke[i].sifraRacuna, this.service.stavke[i].barkod).subscribe(data => {
      this.stavkaService.deletetStavke(data.stavkaRacunaId).subscribe(x => {
        this.service.stavke.splice(i, 1);
        this.updateSume();
        this.toastr.success('Stavka racuna je uspesno izbrisana', 'Knjizara');
      },
        (error: any) => { this.toastr.warning('Doslo je do greske', 'Knjizara') })
    })
  }

  print(): void {
    window.print()
    window.location.reload()
  }

  redirectNaListu() {
    this.service.detailForm = new FormGroup({
      sifraRacuna: new FormControl(Math.floor(1000000 + Math.random() * 900000000)),
      vremeIzdavanja: new FormControl(new Date),
      ukupanIznos: new FormControl(0)
    })
    this.service.stavke = []
    this.route.navigate(['/racuni'])
  }
}
