import { Component, OnInit, Inject } from '@angular/core';
import { KorisniciService } from '../korisnici.service';
import { KorisnikService } from '../korisnik/korisnik.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rola } from '../../Model/rola.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-korisnika',
  templateUrl: './edit-korisnika.component.html',
  styleUrls: ['./edit-korisnika.component.css']
})
export class EditKorisnikaComponent implements OnInit {
  selected: string
  korisnickoIme: string

  constructor(private service: KorisniciService,
    private korisnikService: KorisnikService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<EditKorisnikaComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.korisnikService.getSvihRola().subscribe(znj => this.role = znj)
    let korisnikId = this.data.korisnikId
    this.service.getKorisnikById(korisnikId).subscribe(data => {
      this.korisnikService.detaljiForm.patchValue({
        korisnikId: data.korisnikId,
        ime: data.ime,
        prezime: data.prezime,
        korisnickoIme: data.korisnickoIme,
        lozinka: data.lozinka,
        mail: data.mail,
        datumRodjenja: data.datumRodjenja,
        pol: data.pol,
        telefon: data.telefon,
        plata: data.plata,
        rolaId: data.rolaId
      })
      this.selected = data.rolaId.toString()
      this.korisnickoIme = data.korisnickoIme;
    })
   
  }

  role: Rola[];

  onSubmit() {
    let korisnikId = this.data.korisnikId
    let korisnickoIme = this.korisnikService.detaljiForm.get('korisnickoIme').value
    this.service.putKorisnika(korisnikId, this.korisnikService.detaljiForm.value).subscribe(x => {

      this.toastr.success('Podaci o korisniku ' + korisnickoIme + ' su uspesno izmenjeni', 'Knjizara')
      this.router.navigate(['/korisnici'])
    },

      (error: any) => { this.toastr.warning('Doslo je do greske: ' + error, 'Knjizara') })
    this.onClose()
  }

  onClose() {
    this.korisnikService.detaljiForm.reset();
    this.dialogRef.close();
  }
}
