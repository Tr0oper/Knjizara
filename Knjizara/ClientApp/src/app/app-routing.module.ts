import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './HomePage/home.component';
import { CreateComponent } from './proizvod/create.component';
import { ListaComponent } from './proizvod/lista.component';
import { DetailsComponent } from './proizvod/details.component';
import { ListaVrstaComponent } from './vrstaProizvoda/lista-vrsta.component';
import { CreateListaVrstaComponent } from './vrstaProizvoda/create-lista-vrsta.component';
import { RacuniComponent } from './racuni/racuni.component';
import { RacunComponent } from './racuni/racun/racun.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { KorisnikComponent } from './korisnici/korisnik/korisnik.component';
import { EditKorisnikaComponent } from './korisnici/detalji/edit-korisnika.component';
import { LoginComponent } from './korisnici/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthRolaGuard } from './auth/auth-rola.guard';
import { RoleComponent } from './role/role.component';
import { RolaComponent } from './role/rola/rola.component';
import { DetaljiRoleComponent } from './role/detalji-role/detalji-role.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dodaj', component: CreateComponent, canActivate:[AuthGuard] },
  { path: 'lista', component: ListaComponent, canActivate: [AuthGuard] },
  { path: 'detalji/:id', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'vrsteProizvoda', component: ListaVrstaComponent, canActivate: [AuthGuard] },
  { path: 'dodajVrstu', component: CreateListaVrstaComponent, canActivate: [AuthGuard] },
  { path: 'racuni', component: RacuniComponent, canActivate: [AuthGuard] },
  {
    path: 'racun', children: [
      { path: '', component: RacunComponent, canActivate: [AuthGuard] },
      { path: 'edit/:sifraRacuna', component: RacunComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'korisnici', component: KorisniciComponent, canActivate: [AuthGuard, AuthRolaGuard], },
  { path: 'korisnik', component: KorisnikComponent, canActivate: [AuthGuard, AuthRolaGuard] },
  { path: 'korisnik/:korisnikId', component: EditKorisnikaComponent, canActivate: [AuthGuard, AuthRolaGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'role', component: RoleComponent, canActivate: [AuthGuard, AuthRolaGuard] },
  { path: 'rola', component: RolaComponent, canActivate: [AuthGuard, AuthRolaGuard]  },
  { path: 'detaljiRole/:rolaId', component: DetaljiRoleComponent, canActivate: [AuthGuard, AuthRolaGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
