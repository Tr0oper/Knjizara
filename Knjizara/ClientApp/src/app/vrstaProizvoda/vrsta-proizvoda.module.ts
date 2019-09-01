import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CreateListaVrstaComponent } from './create-lista-vrsta.component';
import { ListaVrstaComponent } from './lista-vrsta.component';
import { MatButtonModule, MatInputModule, MatSortModule, MatPaginatorModule, MatTableModule, MatFormFieldModule, MatToolbarModule, MatIconModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListaVrstaComponent,
    CreateListaVrstaComponent,
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
export class VrstaProizvodaModule { }
