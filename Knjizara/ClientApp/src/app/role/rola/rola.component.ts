import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-rola',
  templateUrl: './rola.component.html',
  styleUrls: ['./rola.component.css']
})
export class RolaComponent implements OnInit {

  constructor(private service: RoleService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<RolaComponent>
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    this.service.postRole(this.service.roleCreate.value).subscribe(data => {
      this.toastr.success('Rola je uspesno dodata', 'Knjizara')
    },
      (error: any) => {
        this.toastr.warning('Doslo je do greske', 'Knjizara')
        console.log(error)
      })


    this.onClose()
  }

  onClose() {
    this.service.roleCreate.reset();
    this.dialogRef.close();
  }
}
