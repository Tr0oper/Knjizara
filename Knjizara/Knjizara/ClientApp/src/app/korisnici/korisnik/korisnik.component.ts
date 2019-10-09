import { Component, OnInit } from '@angular/core';
import { KorisnikService } from './korisnik.service';
import { Rola } from '../../Model/rola.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.css']
})
export class KorisnikComponent implements OnInit {

  role: Rola[];
  
  constructor(private service: KorisnikService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<KorisnikComponent>
  ) { }
  id: number
  ngOnInit() {
    this.service.getSvihRola().subscribe(data => {
      this.role = data
    })
    this.service.getPoslednjiId().subscribe(x => { this.id = x+1 })
  }

  onSubmit() {
    let ime = this.service.korisnikForm.get('korisnickoIme').value

    // uvecavamo dan na izabranom datumu posto prikazuje za jedan dan manje od izabranog
    let datum = this.service.korisnikForm.get('datumRodjenja').value
    datum.setDate(datum.getDate() + 1);
    this.service.korisnikForm.patchValue({ datumRodjenja: datum })

    this.service.korisnikForm.patchValue({ korisnikId: this.id })
   
    this.service.postKorisnika(this.service.korisnikForm.value).subscribe(data => {
      this.toastr.success('Korisnik ' + ime + ' je uspesno registrovan', 'Knjizara')
      this.service.korisnikForm.reset();
    },
      (error: any) => {
        this.toastr.warning('Korisnik sa unetim mailom ili korisnickim imenom postoji u bazi', 'Knjizara')
        console.log(error)
      }
    )
    
    this.onClose();
  }

  onClose() {
    this.service.korisnikForm.reset();
    this.dialogRef.close();
  }
}
