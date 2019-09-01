import { Component, OnInit, ViewChild } from '@angular/core';
import { ProizvodService } from './proizvod.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Proizvod } from '../Model/proizvod.model';
import { MatTableDataSource } from '@angular/material/table';
import { VrsteProizvoda } from '../Model/vrstaProizvoda.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { VrstaProizvodaService } from '../vrstaProizvoda/vrsta-proizvoda.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private proizvodService: ProizvodService,
    private route: ActivatedRoute,
    private service: VrstaProizvodaService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  displayedColumns: string[] = ['barkod', 'naziv', 'cena', 'kolicina', 'proizvodjac', 'zemljaPorekla', 'proizvodId', 'opcije']; //'cena', 'kolicina', 'proizvodjac', 'zemljaPorekla', 'proizvodId',
  listaVrsta: VrsteProizvoda[];
  dataSource: MatTableDataSource<VrsteProizvoda>;
  vrsta: VrsteProizvoda;
  lista: VrsteProizvoda[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.proizvodService.getProizvodById(+id).subscribe(data => {
      this.proizvodService.detailForm.setValue({ proizvodId: data.proizvodId, naziv: data.naziv })
      this.proizvodService.getVrstePoIdProizvoda(+id).subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator;
      })
     
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(barkod: number) {
    let id = this.route.snapshot.paramMap.get('id');
    this.service.deleteVrsta(barkod).subscribe(data => {
      this.toastr.success('Uspesno ste obrisali proizvod', 'Knjizara')
      this.proizvodService.getVrstePoIdProizvoda(+id).subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator;
        this.router.navigate(['/detalji/' + id])
      },

        (err: any) => { this.toastr.error('Doslo je do greske!', 'Knjizara') })
    })
  }

}
