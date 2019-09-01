import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { ListaComponent } from './lista.component';
import { DetailsComponent } from './details.component';
import { MatIconModule, MatToolbarModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CreateComponent,
    ListaComponent,
    DetailsComponent
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
    MatButtonModule
  ]
})
export class ProizvodModule { }
