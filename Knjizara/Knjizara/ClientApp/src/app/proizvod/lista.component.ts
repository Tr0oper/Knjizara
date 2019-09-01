import { Component, OnInit, ViewChild } from '@angular/core';
import { ProizvodService } from './proizvod.service';
import { Proizvod } from '../model/proizvod.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { state, trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './create.component';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ListaComponent implements OnInit {


  displayedColumns: string[] = ['proizvodId', 'naziv', 'opcije'];
  proizvodi: Proizvod[];
  dataSource: MatTableDataSource<Proizvod>;
  expandedElement: Proizvod | null;
  proizvod: Proizvod;
  lista: Proizvod[];
  

  constructor(private service: ProizvodService,
    private toastr: ToastrService,
    private route: Router,
    private dialog: MatDialog
  ) {
    
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.service.getSvihProizvoda().subscribe(x => {
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    this.service.deleteProizvoda(id)
      .subscribe(data => {
        this.toastr.success('Proizvod uspesno obrisan', 'Knjizara');
        this.service.getSvihProizvoda()
          .subscribe(x => {
            this.dataSource = new MatTableDataSource(x);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.route.navigate(['/lista']);

          });
      },
        (error: any) => { this.toastr.warning('Doslo je do greske', 'Knjizara'); }
      );
  }


  onSubmit(proizvod: Proizvod) {
    this.service.formUpdate.setValue({ proizvodId: proizvod.proizvodId, naziv: this.service.formUpdate.get('naziv').value });
    if (!this.service.formUpdate.get('naziv').value) {
      this.toastr.error('Greska, polje za naziv mora biti popunjeno!', 'Knjizara');
    }
    else {
      
      this.service.putProizvoda(this.service.formUpdate.value).subscribe(data => {
        this.toastr.success('Proizvod je uspesno izmenjen', 'Knjizara');
        this.service.getSvihProizvoda().subscribe(x => {
          this.dataSource = new MatTableDataSource(x);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.service.formUpdate.reset();
          
        });
      })
    }
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "35%";
    dialogConfig.height = "55%";
    let dialogRef = this.dialog.open(CreateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.service.getSvihProizvoda().subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        this.route.navigate(['/lista'])
      })
    })
  }

}

