import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { VrsteProizvoda } from '../Model/vrstaProizvoda.model';
import { MatTableDataSource } from '@angular/material/table';
import { VrstaProizvodaService } from './vrsta-proizvoda.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CreateListaVrstaComponent } from './create-lista-vrsta.component';
import { verifyHostBindings, CommentStmt } from '@angular/compiler';
import { log } from 'util';
import { FormControl } from '@angular/forms';


export class DialogContentExample {
  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(ListaVrstaComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-lista-vrsta',
  templateUrl: './lista-vrsta.component.html',
  styleUrls: ['./lista-vrsta.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class ListaVrstaComponent implements OnInit {

  displayedColumns: string[] = ['barkod', 'naziv', 'cena', 'kolicina', 'proizvodjac', 'zemljaPorekla', 'proizvodId', 'opcije']; //'cena', 'kolicina', 'proizvodjac', 'zemljaPorekla', 'proizvodId',
  listaVrsta: VrsteProizvoda[];
  dataSource: MatTableDataSource<VrsteProizvoda>;
  expandedElement: VrsteProizvoda | null;
  vrsta: VrsteProizvoda;
  lista: VrsteProizvoda[];

  constructor(private service: VrstaProizvodaService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.service.getSvihVrsta().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(barkod: number) {
    this.service.deleteVrsta(barkod).subscribe(data => {
      this.toastr.error('Greska pri cuvanju izmena u bazi', 'Knjizara');
      this.service.getSvihVrsta().subscribe(x => {
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    },
      (error: any) => { this.toastr.error('Doslo je do greske', 'Knjizara'); }
    );
  }

  onSubmit(vrsta: VrsteProizvoda) {
    this.service.formUpdate.setValue({
      barkod: vrsta.barkod,
      naziv: this.service.formUpdate.get('naziv').value ? this.service.formUpdate.get('naziv').value : vrsta.naziv,
      cena: this.service.formUpdate.get('cena').value ? this.service.formUpdate.get('cena').value : vrsta.cena,
      kolicina: this.service.formUpdate.get('kolicina').value ? this.service.formUpdate.get('kolicina').value : vrsta.kolicina,
      proizvodjac: this.service.formUpdate.get('proizvodjac').value ? this.service.formUpdate.get('proizvodjac').value : vrsta.proizvodjac,
      zemljaPorekla: this.service.formUpdate.get('zemljaPorekla').value ? this.service.formUpdate.get('zemljaPorekla').value : vrsta.zemljaPorekla,
      proizvodId: vrsta.proizvodId
    });

      this.service.putVrste(this.service.formUpdate.value).subscribe(data => {
        this.toastr.success('Vrsta proizvoda je uspesno izmenjena', 'Knjizara');
        this.service.getSvihVrsta().subscribe(x => {
          this.dataSource = new MatTableDataSource(x);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.service.formUpdate.reset();

        })
      },
        (error: any) => { this.toastr.error('Doslo je do greske, nije moguce sacuvati unete izmene', 'Knjizara') }
      )
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "68% "
    let dialogRef = this.dialog.open(CreateListaVrstaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.service.getSvihVrsta().subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      });
    })
  }

}
