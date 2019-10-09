import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Korisnik } from '../Model/korisnik.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  url: string = 'https://localhost:44302';

  loginForm: FormGroup = new FormGroup({
    korisnickoIme: new FormControl('', Validators.required),
    lozinka: new FormControl('', Validators.required)
  })

  constructor(private http: HttpClient) { }

  getSvihKorisnika(): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(this.url + '/api/Korisniks');
  }

  deleteKorisnika(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/api/Korisniks/' + id);
  }

  getKorisnikById(id: number): Observable<Korisnik> {
    return this.http.get<Korisnik>(this.url + '/api/Korisniks/' + id);
  }

  putKorisnika(id: number, korisnik: Korisnik): Observable<Korisnik> {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.put<Korisnik>(this.url + '/api/Korisniks/' + id, korisnik, { headers: reqHeader })
  }

  logovanje(formData) {
    return this.http.post(this.url + '/api/Korisniks/login', formData)
  }

}
