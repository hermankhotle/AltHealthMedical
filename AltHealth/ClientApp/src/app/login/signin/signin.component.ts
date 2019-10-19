import { Component, OnInit } from '@angular/core';
import { SigninService } from 'src/app/shared/sign/signin.service';
// import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(private service: SigninService,
    private toastr: ToastrService, private router: Router) { }
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(form != null)
    form.resetForm();
    this.service.formData = {
    UserName: '',
    Password: '',
    }
  }

  onSubmit(form:NgForm) {
    this.service.register(form.value).subscribe(
      (res : any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/home');
        this.toastr.success('Welcomed', 'Logged In')
      },
      err => {
        if (err.status == 400)
        this.toastr.error('Incorrect username or password.', 'Authentication Failed')
        else
        console.log(err);
      }
    )
  }

}
