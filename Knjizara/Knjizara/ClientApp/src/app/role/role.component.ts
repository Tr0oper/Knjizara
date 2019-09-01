import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from './role.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Rola } from '../Model/rola.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RolaComponent } from './rola/rola.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class RoleComponent implements OnInit {

  displayedColumns: string[] = ['rolaId', 'naziv', 'opcije'];
  role: Rola[];
  dataSource: MatTableDataSource<Rola>;
  expandedElement: Rola | null;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: RoleService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.service.getSvihRola().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    this.service.deleteRole(id)
      .subscribe(data => {
        this.toastr.success('Rola uspesno obrisana', 'Knjizara');
        this.service.getSvihRola()
          .subscribe(x => {
            this.dataSource = new MatTableDataSource(x);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.router.navigate(['/role']);

          });
      },
        (error: any) => { this.toastr.warning('Doslo je do greske', 'Knjizara'); }
      );
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.height = "40%";
    let dialogRef = this.dialog.open(RolaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.service.getSvihRola().subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        this.router.navigate(['/role'])
      })
    })
  }

  onSubmit(rola: Rola) {
    this.service.roleForm.patchValue({ rolaId: rola.rolaId })
    this.service.putRole(this.service.roleForm.value).subscribe(data => {
      this.toastr.success('Rola je uspesno izmenjena', 'Knjizara');
      this.service.getSvihRola().subscribe(x => {
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.service.roleForm.reset();
      })
    },
      (err: any) => {
        this.toastr.error('Doslo je do greske!', 'Knjizara')
        console.log(err)
      })
    
    
  }

}
