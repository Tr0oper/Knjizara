import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Rola } from '../../Model/rola.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Korisnik } from '../../Model/korisnik.model';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  url: string = 'https://localhost:44302';

  constructor(private http: HttpClient) { }

  korisnikForm: FormGroup = new FormGroup({
    korisnikId: new FormControl(0),
    korisnickoIme: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
    ime: new FormControl('', Validators.required),
    prezime: new FormControl('', Validators.required),
    lozinka: new FormControl('', Validators.required),
    datumRodjenja: new FormControl(Date, Validators.required),
    pol: new FormControl('', Validators.required),
    telefon: new FormControl('', Validators.required),
    plata: new FormControl(0, Validators.required),
    rolaId: new FormControl(0, Validators.required)
  })

  detaljiForm: FormGroup = new FormGroup({
    korisnikId: new FormControl(0),
    korisnickoIme: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
    ime: new FormControl('', Validators.required),
    prezime: new FormControl('', Validators.required),
    lozinka: new FormControl('', Validators.required),
    datumRodjenja: new FormControl(Date, Validators.required),
    pol: new FormControl('', Validators.required),
    telefon: new FormControl('', Validators.required),
    plata: new FormControl(null, Validators.required),
    rolaId: new FormControl(null, Validators.required)
  })

  getSvihRola(): Observable<Rola[]> {
    return this.http.get<Rola[]>(this.url + '/api/Rolas');
  }

  postKorisnika(korisnik: Korisnik) {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.post(this.url + '/api/Korisniks', korisnik, { headers: reqHeader }
    )
  }

  getPoslednjiId(): Observable<number> {
    return this.http.get<number>(this.url + '/api/Korisniks/max');
  }
}
