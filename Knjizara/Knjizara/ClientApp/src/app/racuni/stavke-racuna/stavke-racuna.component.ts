import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { StavkeRacunaService } from './stavke-racuna.service';
import { FormGroup, FormControl } from '@angular/forms';
import { RacunService } from '../racun/racun.service';
import { VrsteProizvoda } from '../../Model/vrstaProizvoda.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stavke-racuna',
  templateUrl: './stavke-racuna.component.html',
  styleUrls: ['./stavke-racuna.component.css']
})
export class StavkeRacunaComponent implements OnInit {


  vrste: VrsteProizvoda[];
  stavkaId: number;
  selected: string

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<StavkeRacunaComponent>,
    private service: StavkeRacunaService,
    private toastr: ToastrService,
    private racunService: RacunService
  ) { }

  ngOnInit() {
    this.service.getSvihVrsta().subscribe(data => {
      this.vrste = data;
      this.service.getVrstaByBarkod(this.service.stavkaForm.get('barkod').value).subscribe(x => {
        this.selected = x.barkod.toString()
      })
    })

    if (this.data.stavkaRacunaIndex == null) {
      this.service.stavkaForm = new FormGroup({
        stavkaRacunaId: new FormControl(0),
        sifraRacuna: new FormControl(this.racunService.detailForm.get('sifraRacuna').value),
        kolicina: new FormControl(0),
        cenaPoJedinici: new FormControl(0),
        barkod: new FormControl(0),
        naziv: new FormControl(''),
        ukupno: new FormControl(0)
      });

    }
    else {
      let stavka = this.racunService.stavke[this.data.stavkaRacunaIndex]
      this.service.stavkaForm.patchValue({
        stavkaRacunaId: stavka.stavkaRacunaId,
        sifraRacuna: stavka.sifraRacuna, kolicina: stavka.kolicina,
        cenaPoJedinici: stavka.cenaPoJedinici, barkod: stavka.barkod, naziv: stavka.naziv, ukupno: stavka.ukupno
      })
    }
   
  }

  onSubmit(form: FormGroup) {
    if (this.data.stavkaRacunaIndex == null) {

      let stavke = this.service.stavkaForm.value;

      this.service.postStavke(this.service.stavkaForm.value).subscribe(data => {
        this.racunService.stavke.push(stavke)

        this.toastr.success('Stavka racuna je uspesno dodata', 'Knjizara');
        this.service.stavkaForm.reset();
      },
        (error: any) => { this.toastr.warning('Doslo je do greske', 'Knjizara') })
      this.onClose();
    }
    else {
      
      this.service.getStavkePoBarkodu(this.service.stavkaForm.get('sifraRacuna').value, this.service.stavkaForm.get('barkod').value).subscribe(data => {
        this.stavkaId = data.stavkaRacunaId
        this.service.putStavke(this.stavkaId, this.service.stavkaForm.value).subscribe(x => {
          this.toastr.success('Stavka racuna je uspesno izmenjena', 'Knjizara');
          this.racunService.stavke[this.data.stavkaRacunaIndex] = form.value;
        },
          (error: any) => {
            this.toastr.warning('Doslo je do greske', 'Knjizara')
            return;
          })
      })
    }
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close()
    this.service.stavkaForm.reset();
  }

  updateCena(ctrl) {
    if (ctrl.value === undefined) {
      this.service.stavkaForm.patchValue({ cenaPoJedinici: 0 })
      this.service.stavkaForm.patchValue({ naziv: '' })
    }
    else {
      this.service.getCenaByBarkod(ctrl.value).subscribe(data => {
        this.service.stavkaForm.patchValue({ cenaPoJedinici: data.toFixed(2) })
      })
      this.service.getVrstaByBarkod(ctrl.value).subscribe(vp => {
        this.service.stavkaForm.patchValue({ naziv: vp.naziv })
      })
    }
  }

  updateUkupno(ctrl) {
    this.service.getCenaByBarkod(this.service.stavkaForm.get('barkod').value).subscribe(r => {
      this.service.stavkaForm.patchValue({ ukupno: r * this.service.stavkaForm.get('kolicina').value })
    })
  }
}
