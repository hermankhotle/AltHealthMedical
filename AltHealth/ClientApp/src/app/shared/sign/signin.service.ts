import { Injectable } from '@angular/core';
import { Signin} from './signin.model'
  import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  formData:Signin;
  readonly rootURL = 'http://localhost:52188/api';
  list: Signin[];

  constructor(private http: HttpClient) { }

  register(formData : Signin){
    return this.http.post(this.rootURL+'/RegistrationUser/Login',formData);
  }
}
