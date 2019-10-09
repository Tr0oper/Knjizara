import { Component, OnInit, ViewChild } from '@angular/core';
import { VrstaProizvodaService } from './vrsta-proizvoda.service';
import { ToastrService } from 'ngx-toastr';
import { VrsteProizvoda } from '../Model/vrstaProizvoda.model';
import { Proizvod } from '../Model/proizvod.model';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-create-lista-vrsta',
  templateUrl: './create-lista-vrsta.component.html',
  styleUrls: ['./create-lista-vrsta.component.css']
})
export class CreateListaVrstaComponent implements OnInit {

  constructor(private service: VrstaProizvodaService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<CreateListaVrstaComponent>,
    private router: Router
  ) { }
  proizvodi: Proizvod[];

  ngOnInit() {
    this.service.getSvihProizvoda().subscribe(data => this.proizvodi = data)
  }

  onSubmit() {
    this.service.postVrste(this.service.createForm.value)
      .subscribe(data => {
        this.toastr.success('Proizvod uspesno dodat', 'Knjizara');
        this.service.createForm.reset();

      },
        (error: any) => { this.toastr.error('Doslo je do greske, nije moguce dodati nov proizvod', 'Knjizara') }
    )
    this.onClose();
  }

  dataSource: MatTableDataSource<VrsteProizvoda>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  onClose() {
    this.service.createForm.reset();
    this.dialogRef.close();
  }
}
