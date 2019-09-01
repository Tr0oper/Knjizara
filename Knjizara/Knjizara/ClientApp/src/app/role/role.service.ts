import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Rola } from '../Model/rola.model';
import { Observable } from 'rxjs';
import { Korisnik } from '../Model/korisnik.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  
  url: string = 'https://localhost:44302';

  roleForm: FormGroup = new FormGroup({
    rolaId: new FormControl(0),
    naziv: new FormControl('')
  })

  roleCreate: FormGroup = new FormGroup({
    rolaId: new FormControl(0),
    naziv: new FormControl('', Validators.required)
  })

  detaljiRole: FormGroup = new FormGroup({
    rolaId: new FormControl(0),
    naziv: new FormControl('', Validators.required)
  })

  constructor(private http: HttpClient) { }

  getSvihRola(): Observable<Rola[]> {
    return this.http.get<Rola[]>(this.url + '/api/Rolas');
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/api/Rolas/' + id)
  }

  postRole(rola: Rola) {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.post(this.url + '/api/Rolas', rola, { headers: reqHeader })
  }

  putRole(rola: Rola): Observable<Rola> {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.put<Rola>(this.url + '/api/Rolas/' + rola.rolaId, rola, { headers: reqHeader });
  }

  getRoleById(id: number): Observable<Rola> {
    return this.http.get<Rola>(this.url + '/api/Rolas/' + id);
  }

  getKorisnikaById(id: number): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(this.url + '/api/Rolas/korisnik/' + id);
  }

  deleteKorisnika(id: number): Observable<Korisnik> {
    return this.http.delete<Korisnik>(this.url + '/api/Korisniks/' + id);
  }
}
