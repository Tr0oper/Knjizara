import { Component, OnInit, ViewChild } from '@angular/core';
import { KorisniciService } from './korisnici.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { Korisnik } from '../Model/korisnik.model';
import { KorisnikService } from './korisnik/korisnik.service';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { EditKorisnikaComponent } from './detalji/edit-korisnika.component';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css']
})
export class KorisniciComponent implements OnInit {

  displayedColumns = ['korisnikId', 'ime', 'prezime', 'korisnickoIme', 'mail', 'datumRodjenja', 'pol', 'telefon', 'plata', 'rolaId', 'opcije'];
  dataSource: MatTableDataSource<Korisnik>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  korisnickoIme: string

  constructor(private service: KorisniciService,
    private serviceKorisnika: KorisnikService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.service.getSvihKorisnika().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    this.service.getKorisnikById(id).subscribe(znj => { this.korisnickoIme = znj.korisnickoIme })
    this.service.deleteKorisnika(id).subscribe(data => {
      this.toastr.success('Korisnik ' + this.korisnickoIme + ' je uspesno obrisan!', 'Knjizara')
      this.service.getSvihKorisnika().subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        this.router.navigate(['/korisnici'])
      })
    },
      (error: any) => { this.toastr.warning('Doslo je do greske', 'Knjizara'); }
    );
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "85%";
    dialogConfig.height = "78%";
    let dialogRef = this.dialog.open(KorisnikComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.service.getSvihKorisnika().subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        this.router.navigate(['/korisnici'])
      })
    })
  }

  openForEdit(korisnikId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "85%";
    dialogConfig.height = "78%";
    dialogConfig.data = { korisnikId }
    let dialogRef = this.dialog.open(EditKorisnikaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.service.getSvihKorisnika().subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
    })
   
  }

}
