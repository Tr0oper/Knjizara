import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Racun } from '../Model/racun.model';
import { RacuniService } from './racuni.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-racuni',
  templateUrl: './racuni.component.html',
  styleUrls: ['./racuni.component.css']
})
export class RacuniComponent implements OnInit {

  displayedColumns = ['sifraRacuna', 'vremeIzdavanja', 'ukupanIznos', 'opcije'];
  dataSource: MatTableDataSource<Racun>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: RacuniService,
    private toastr: ToastrService,
    private route: Router
  ) { }

  ngOnInit() {
    this.service.getSvihRacuna().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(sifra: number) {
    this.service.deleteRacuna(sifra).subscribe(datra => {
      this.toastr.success('Uspesno ste obrisali racun sa sifrom: ' + sifra, 'Knjizara')
      this.service.getSvihRacuna().subscribe(data => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort

        this.route.navigate(['/racuni'])
      })
    },

      (error: any) => { this.toastr.warning('Doslo je do greske', 'Knjizara'); });
  }

  onCreate() {
    this.route.navigate(['/racun'])
  }

  openForEdit(sifraRacuna: number) {
    this.route.navigate(['/racun/edit/' + sifraRacuna])
  }
}
