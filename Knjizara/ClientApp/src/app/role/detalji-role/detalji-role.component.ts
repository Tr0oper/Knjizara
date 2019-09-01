import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Rola } from '../../Model/rola.model';
import { Korisnik } from '../../Model/korisnik.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalji-role',
  templateUrl: './detalji-role.component.html',
  styleUrls: ['./detalji-role.component.css']
})
export class DetaljiRoleComponent implements OnInit {

  displayedColumns = ['korisnikId', 'ime', 'prezime', 'korisnickoIme', 'mail', 'datumRodjenja', 'pol', 'telefon', 'plata', 'opcije'];
  dataSource: MatTableDataSource<Korisnik>;
  

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: RoleService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('rolaId')
    this.service.getRoleById(parseInt(id)).subscribe(data => {
      this.service.detaljiRole.setValue({ rolaId: data.rolaId, naziv: data.naziv })
      this.service.getKorisnikaById(parseInt(id)).subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      })
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(idKorisnika: number) {
    let id = this.route.snapshot.paramMap.get('rolaId');
    this.service.deleteKorisnika(idKorisnika).subscribe(data => {
      this.toastr.success('Uspesno ste obrisali korisnika: ' + data.korisnickoIme, 'Knjizara')
      this.service.getKorisnikaById(parseInt(id)).subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator;
        this.router.navigate(['/detaljiRole/' + id])
      },

        (err: any) => { this.toastr.error('Doslo je do greske!', 'Knjizara') })
    })
  }

}
