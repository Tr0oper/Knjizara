import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { MatSelectModule, MatRadioModule, MatDatepickerModule, MatButtonModule, MatInputModule, MatSortModule, MatPaginatorModule, MatTableModule, MatFormFieldModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RolaComponent } from './rola/rola.component';
import { DetaljiRoleComponent } from './detalji-role/detalji-role.component';



@NgModule({
  declarations: [RoleComponent, RolaComponent, DetaljiRoleComponent],
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
    MatSelectModule,
  ]
})
export class RolaModule { }
