import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';

import { RolaModule } from './role/rola.module';

import { ProizvodService } from './proizvod/proizvod.service';
import { CreateListaVrstaComponent } from './vrstaProizvoda/create-lista-vrsta.component';
import { StavkeRacunaComponent } from './racuni/stavke-racuna/stavke-racuna.component';
import { VrstaProizvodaService } from './vrstaProizvoda/vrsta-proizvoda.service';
import { RacunService } from './racuni/racun/racun.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ProizvodModule } from './proizvod/proizvod.module';
import { RouterModule } from '@angular/router';
import { VrstaProizvodaModule } from './vrstaProizvoda/vrsta-proizvoda.module';
import { RacunModule } from './racuni/racun.module';
import { KorisnikModule } from './korisnici/korisnik.module';
import { HomeModule } from './HomePage/home.module';
import { KorisniciService } from './korisnici/korisnici.service';
import { KorisnikService } from './korisnici/korisnik/korisnik.service';
import { StavkeRacunaService } from './racuni/stavke-racuna/stavke-racuna.service';
import { RacuniService } from './racuni/racuni.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { RoleService } from './role/role.service';
import { StatistikaService } from './HomePage/statistika.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    RacunModule,
    KorisnikModule,
    ProizvodModule,
    VrstaProizvodaModule,
    HomeModule,
    RolaModule,
    FormsModule,
    CdkTableModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSortModule,
    MatToolbarModule,
    PortalModule,
    ScrollingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [ProizvodService, VrstaProizvodaService, RacunService, KorisniciService, KorisnikService, StavkeRacunaService, RacuniService, StatistikaService, RoleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateListaVrstaComponent, StavkeRacunaComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
