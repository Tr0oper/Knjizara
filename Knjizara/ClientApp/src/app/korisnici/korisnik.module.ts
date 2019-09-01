import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KorisniciComponent } from './korisnici.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { MatToolbarModule, MatIconModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatInputModule, MatSortModule, MatButtonModule, MatDatepickerModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditKorisnikaComponent } from './detalji/edit-korisnika.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    KorisniciComponent,
    KorisnikComponent,
    EditKorisnikaComponent,
    LoginComponent
    
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule
  ],
  providers: [
  ]
})
export class KorisnikModule { }
