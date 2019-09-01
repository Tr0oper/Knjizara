import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StavkeRacunaComponent } from './stavke-racuna/stavke-racuna.component';
import { RacunComponent } from './racun/racun.component';
import { RacuniComponent } from './racuni.component';
import { MatSelectModule, MatButtonModule, MatInputModule, MatSortModule, MatPaginatorModule, MatTableModule, MatFormFieldModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RacuniComponent,
    RacunComponent,
    StavkeRacunaComponent
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
    MatSelectModule
  ]
})
export class RacunModule { }
