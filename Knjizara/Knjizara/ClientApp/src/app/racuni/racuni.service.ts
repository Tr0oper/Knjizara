import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Racun } from '../Model/racun.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RacuniService {


  url: string = 'https://localhost:44302';
  constructor(private http: HttpClient) { }

  getSvihRacuna(): Observable<Racun[]> {
    return this.http.get<Racun[]>(this.url + '/api/Racuns');
  }

  getRacunaBySifra(sifra: number): Observable<Racun> {
    return this.http.get<Racun>(this.url + '/api/Racuns/' + sifra);
  }

  deleteRacuna(sifra: number): Observable<void> {
    return this.http.delete<void>(this.url + '/api/Racuns/' + sifra);
  }
}
