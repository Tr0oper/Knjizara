import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Statistika } from '../Model/statistika.model';
import { Racun } from '../Model/racun.model';

@Injectable({
  providedIn: 'root'
})

export class GodisnjiObracun {
  godina: number
  ukupnaZarada: number
}

export class DnevniPazar {
  dan: number
  zarada: number
}


export class StatistikaService {

  url: string = 'https://localhost:44302';

  constructor(private http: HttpClient) { }

  statistikaForm: FormGroup = new FormGroup({
    godina: new FormControl(0)
  })

  getZaradePoMesecimaZaGodinu(goidna: number): Observable<Statistika[]> {
    return this.http.get<any>(this.url + '/api/Statistika/' + goidna)
  }

  getSvihGodinaRacuna(): Observable<number> {
    return this.http.get<number>(this.url + '/api/Statistika')
  }

  ukupnaZaradaIzabraneGodine(godina: number): Observable<GodisnjiObracun> {
    return this.http.get<GodisnjiObracun>(this.url + '/api/Statistika/zarada/' + godina)
  }

  zaradaNaDnevnomNivou(): Observable<DnevniPazar> {
    return this.http.get<DnevniPazar>(this.url + '/api/Statistika/pazar')
  }

  dnevniRacuni(): Observable<Racun[]> {
    return this.http.get<Racun[]>(this.url + '/api/Statistika/racuni')
  }
}
