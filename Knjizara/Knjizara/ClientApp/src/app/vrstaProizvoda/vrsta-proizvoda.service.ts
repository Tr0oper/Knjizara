import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VrsteProizvoda } from '../Model/vrstaProizvoda.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Proizvod } from '../Model/proizvod.model';


@Injectable({
  providedIn: 'root'
})
export class VrstaProizvodaService {
  
  url: string = 'https://localhost:44302';

  constructor(private http: HttpClient) { }

  formUpdate: FormGroup = new FormGroup({
    barkod: new FormControl(''),
    naziv: new FormControl(''),
    cena: new FormControl(null),
    kolicina: new FormControl(null),
    proizvodjac: new FormControl(''),
    zemljaPorekla: new FormControl(''),
    proizvodId: new FormControl(null)
  });

  createForm: FormGroup = new FormGroup({
    barkod: new FormControl('', Validators.required),
    naziv: new FormControl('', Validators.required),
    cena: new FormControl(null, Validators.required),
    kolicina: new FormControl(null, Validators.required),
    proizvodjac: new FormControl('', Validators.required),
    zemljaPorekla: new FormControl('', Validators.required),
    proizvodId: new FormControl(0, Validators.required)
  });

  getSvihVrsta(): Observable<VrsteProizvoda[]> {
    return this.http.get<VrsteProizvoda[]>(this.url + '/api/VrstaProizvodas');
  }

  getVrstePoIdProizvoda(id: number): Observable<VrsteProizvoda> {
    return this.http.get<VrsteProizvoda>(this.url + '/api/VrstasProizvoda/proizvod/' + id);
  }

  putVrste(vrsta: VrsteProizvoda): Observable<VrsteProizvoda> {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.put<VrsteProizvoda>(this.url + '/api/VrstaProizvodas/' + vrsta.barkod, vrsta, { headers: reqHeader });
  }

  postVrste(vrsta: VrsteProizvoda) {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.post(this.url + '/api/VrstaProizvodas', vrsta, { headers: reqHeader });
  }

  deleteVrsta(barkod: number): Observable<void> {
    return this.http.delete<void>(this.url + '/api/VrstaProizvodas/' + barkod);
  }

  getSvihProizvoda(): Observable<Proizvod[]> {
    return this.http.get<Proizvod[]>(this.url + '/api/Proizvods');
  }
}
