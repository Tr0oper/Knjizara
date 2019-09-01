import { Component, OnInit } from '@angular/core';
import { KorisnikService } from './korisnik.service';
import { Rola } from '../../Model/rola.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';

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

  ngOnInit() {
    this.service.getSvihRola().subscribe(data => {
      this.role = data
    })
  }

  onSubmit() {
    let ime = this.service.korisnikForm.get('korisnickoIme').value

    // uvecavamo dan na izabranom datumu posto prikazuje za jedan dan manje od izabranog
    let datum = this.service.korisnikForm.get('datumRodjenja').value
    datum.setDate(datum.getDate() + 1);
    this.service.korisnikForm.patchValue({ datumRodjenja: datum })

    this.service.postKorisnika(this.service.korisnikForm.value).subscribe(data => {
      this.toastr.success('Korisnik ' + ime + ' je uspesno registrovan', 'Knjizara')
      this.service.korisnikForm.reset();
      this.service.korisnikForm.patchValue({ korisnikId: 0 })
    },
      (error: any) => {
        this.toastr.warning('Doslo je do greske', 'Knjizara')
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
