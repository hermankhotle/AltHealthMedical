import { Injectable } from '@angular/core';
import { Signup } from './signup.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  formData:Signup;
  readonly rootURL = 'http://localhost:52188/api';
  list: Signup[];

  constructor(private http: HttpClient) { }

  register(formData : Signup){
    return this.http.post(this.rootURL+'/RegistrationUser/Register',formData);
  }
}
