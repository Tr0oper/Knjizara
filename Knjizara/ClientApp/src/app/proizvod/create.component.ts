import { Component, OnInit } from '@angular/core';
import { ProizvodService } from './proizvod.service';
import { Router } from '@angular/router';
import { Proizvod } from '../Model/proizvod.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private proizvodService: ProizvodService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<CreateComponent>
  ) { }

  ngOnInit() {
  }

  proizvod: Proizvod;
  lista: Proizvod[];

  onSubmit() {
    this.proizvodService.postProizvoda(this.proizvodService.form.value)
      .subscribe(data => {
        this.toastr.success('Proizvod uspesno dodat', 'Knjizara');
        this.proizvodService.form.reset();
      },
        (error: any) => { this.toastr.warning('Doslo je do greske, proizovd sa unetim ID-em postoji u bazi', 'Knjizara') }
    )
    this.onClose();
  }

  onClose() {
    this.proizvodService.form.reset();
    this.dialogRef.close();
  }
}
