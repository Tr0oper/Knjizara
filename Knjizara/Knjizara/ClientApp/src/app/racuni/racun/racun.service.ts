import { Injectable } from '@angular/core';
import { Racun } from '../../Model/racun.model';
import { FormGroup, FormControl } from '@angular/forms';
import { StavkaRacuna } from '../../Model/stavkaRacuna.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VrsteProizvoda } from '../../Model/vrstaProizvoda.model';

@Injectable({
  providedIn: 'root'
})
export class RacunService {

  detailForm: FormGroup = new FormGroup({
    sifraRacuna: new FormControl(Math.floor(1000000 + Math.random() * 900000000)),
    vremeIzdavanja: new FormControl(new Date),
    ukupanIznos: new FormControl(0)

  })
  url: string = 'https://localhost:44302';

  stavke: StavkaRacuna[] = [];

  constructor(private http: HttpClient) { }

  getRacunaIStavki(sifra: number): Observable<any> {
    return this.http.get<any>(this.url + '/api/Racuns/detalji/' + sifra);
  }

  getSvihBarkodova(sifra: number): Observable<number> {
    return this.http.get<number>(this.url + '/api/StavkaRacunas/barkods/' + sifra);
  }

  getVrstePoBarkodu(barkod: number): Observable<VrsteProizvoda> {
    return this.http.get<VrsteProizvoda>(this.url + '/api/VrstaProizvodas/' + barkod);
  }

  stanjeRacuna(id: number): Observable<number> {
    return this.http.get<number>(this.url + '/api/StavkaRacunas/stavka/' + id);
  }

  getStavkePoSifri(sifra: number): Observable<StavkaRacuna[]> {
    return this.http.get<StavkaRacuna[]>(this.url + '/api/StavkaRacunas/racun/' + sifra)
  }
  getStavkePoBarkodu(sifra: number, barkod: number): Observable<StavkaRacuna> {
    return this.http.get<StavkaRacuna>(this.url + `/api/StavkaRacunas/${sifra}/${barkod}`);
  }


}
