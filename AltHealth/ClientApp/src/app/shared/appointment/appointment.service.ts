import { Injectable } from '@angular/core';
import { Appointment } from './appointment.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  formData:Appointment;
  readonly rootURL = 'http://localhost:61642/api';
  list: Appointment[];

  constructor(private http: HttpClient) { }

  register(formData : Appointment){
    return this.http.post(this.rootURL+'/bookings_info', formData);
  }

  refreshList() {
    this.http.get(this.rootURL + '/bookings_info')
    .toPromise()
    .then(res => this.list = res as Appointment[]);
  }
}
