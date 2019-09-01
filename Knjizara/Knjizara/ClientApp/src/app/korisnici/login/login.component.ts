import { Component, OnInit } from '@angular/core';
import { KorisniciService } from '../korisnici.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(private service: KorisniciService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (sessionStorage.getItem('token') != null) {
      this.router.navigate(['/home'])
    }
  }



  onSubmit(form: FormGroup) {
    this.service.logovanje(form.value).subscribe((res: any) => {

      sessionStorage.setItem('token', res.token)
      sessionStorage.setItem('rola', res.ulogovanKorisnik.rolaId)
      this.toastr.success('Uspesno ste se ulogovali', 'Knjizara')
      this.router.navigate(['/home'])
    },
      (error: any) => {
          this.toastr.error('Uneto korisnicko ime ili lozinka su pogresni !', 'Knjizara')
      }
      
    )
    this.service.loginForm.reset();
  }

}
