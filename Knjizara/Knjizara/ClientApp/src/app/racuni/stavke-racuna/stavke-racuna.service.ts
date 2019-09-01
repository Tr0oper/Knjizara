import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StavkaRacuna } from '../../Model/stavkaRacuna.model';
import { FormGroup, FormControl } from '@angular/forms';
import { VrsteProizvoda } from '../../Model/vrstaProizvoda.model';
import { Observable } from 'rxjs';
import { RacunService } from '../racun/racun.service';

@Injectable({
  providedIn: 'root'
})
export class StavkeRacunaService {

  url: string = 'https://localhost:44302';

  stavkaForm: FormGroup = new FormGroup({
    stavkaRacunaId: new FormControl(0),
    sifraRacuna: new FormControl(this.serviceRacun.detailForm.get('sifraRacuna').value),
    kolicina: new FormControl(0),
    cenaPoJedinici: new FormControl(0),
    barkod: new FormControl(0),
    naziv: new FormControl(''),
    ukupno: new FormControl(0)
  });

  constructor(private http: HttpClient, private serviceRacun: RacunService) { }

  getSvihVrsta(): Observable<VrsteProizvoda[]> {
    return this.http.get<VrsteProizvoda[]>(this.url + '/api/VrstaProizvodas');
  }

  getStavki(): Observable<StavkaRacuna[]>{
    return this.http.get<StavkaRacuna[]>(this.url + '/api/VrstaProizvodas');
  }

  getCenaByBarkod(barkod: number): Observable<number> {
    return this.http.get<number>(this.url + '/api/VrstaProizvodas/vrsta/' + barkod);
  }

  getVrstaByBarkod(barkod: number): Observable<VrsteProizvoda> {
    return this.http.get<VrsteProizvoda>(this.url + '/api/VrstaProizvodas/' + barkod);
  }

  getStavkePoSifri(sifra: number): Observable<StavkaRacuna[]> {
    return this.http.get<StavkaRacuna[]>(this.url + '/api/StavkaRacunas/racun/' + sifra)
  }

  getStavkePoBarkodu(sifra: number, barkod: number): Observable<StavkaRacuna> {
    return this.http.get<StavkaRacuna>(this.url + `/api/StavkaRacunas/${sifra}/${barkod}`);
  }

  postStavke(stavka: StavkaRacuna) {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.post(this.url + '/api/StavkaRacunas', stavka, { headers: reqHeader });
  }

  putStavke(id:number, stavka: StavkaRacuna): Observable<StavkaRacuna> {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.put<StavkaRacuna>(this.url + '/api/StavkaRacunas/' + id,  stavka, { headers: reqHeader });
  }

  deletetStavke(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/api/StavkaRacunas/' + id);
  }
}
