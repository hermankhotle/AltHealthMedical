import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/shared/signup/signup.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private service: SignupService,
    private toastr: ToastrService) { }
  // constructor (private service: SignupService) {}
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(form != null)
    form.resetForm();
    this.service.formData = {
    UserName: '',
    FullName: '',
    Email: '',
    PhoneNumber: null,
    Password: '',
    }
  }

  onSubmit(form:NgForm) {
    this.service.register(form.value).subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Registered');
      },
      err => {
        console.log(err);
      }
    )
  }
}
