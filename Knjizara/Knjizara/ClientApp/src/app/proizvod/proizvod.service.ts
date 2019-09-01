import { Injectable, Inject } from "@angular/core";
import { Proizvod } from "../model/proizvod.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { VrsteProizvoda } from "../Model/vrstaProizvoda.model";

@Injectable()
export class ProizvodService {

  formData: Proizvod;
  lista: Proizvod[];

  url: string = 'https://localhost:44302';

  form: FormGroup = new FormGroup({
    proizvodId: new FormControl(null, Validators.required),
    naziv: new FormControl('', Validators.required)
  });

  formUpdate: FormGroup = new FormGroup({
    proizvodId: new FormControl(null),
    naziv: new FormControl('')
  });

  detailForm: FormGroup = new FormGroup({
    proizvodId: new FormControl(null),
    naziv: new FormControl('')
  });

  constructor(private http: HttpClient) { }

  getSvihProizvoda(): Observable<Proizvod[]> {
    return this.http.get<Proizvod[]>(this.url + '/api/Proizvods');
  }

  getProizvodById(id: number): Observable<Proizvod> {
    return this.http.get<Proizvod>(this.url + '/api/Proizvods/' + id);
  }

  postProizvoda(proizvod: Proizvod) {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.post(this.url + '/api/Proizvods', proizvod, { headers: reqHeader });
  }

  deleteProizvoda(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/api/Proizvods/' + id);
  }

  putProizvoda(proizvod: Proizvod): Observable<Proizvod> {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.put<Proizvod>(this.url + '/api/Proizvods/' + proizvod.proizvodId, proizvod, { headers: reqHeader });
  }

  getVrstePoIdProizvoda(id: number): Observable<VrsteProizvoda[]> {
    return this.http.get<VrsteProizvoda[]>(this.url + '/api/VrstaProizvodas/proizvod/' + id);
  }
}
