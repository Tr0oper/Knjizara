import { Component, ViewChild, OnInit, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StavkeRacunaService } from '../racuni/stavke-racuna/stavke-racuna.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { RacunService } from '../racuni/racun/racun.service';
import { MatDialogConfig, MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { KorisnikComponent } from '../korisnici/korisnik/korisnik.component';
import { KorisniciComponent } from '../korisnici/korisnici.component';
import { KorisniciService } from '../korisnici/korisnici.service';
import { Korisnik } from '../Model/korisnik.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    ngOnInit(): void {
      
    }

  isHandset$: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset)

  isLogin: boolean
  rola:boolean

  dataSource: MatTableDataSource<Korisnik>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private breakpointObserver: BreakpointObserver,
    private stavkaService: StavkeRacunaService,
    private service: KorisniciService,
    private route: Router,
    private dialog: MatDialog
  ) {
    
  }

  func() {
    this.route.navigate(['/racun'])
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
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        this.route.navigate(['/korisnici'])
      })
    })
  }

  odjava() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('rola')
    this.route.navigate(['/home'])
    
  }

  ulogovan() {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  isRola() {
    const rola = sessionStorage.getItem('rola');
    if (rola === "1")
      return true
    else
      return false
  }
}
