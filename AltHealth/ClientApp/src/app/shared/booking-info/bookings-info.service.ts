import { Injectable } from '@angular/core';
import { BookingsInfo } from './bookings-info.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingsInfoService {
  formData:BookingsInfo;
  readonly rootURL = 'http://localhost:61642/api';
  list: BookingsInfo[];

  constructor(private http: HttpClient) { }

  register(formData : BookingsInfo){
    return this.http.post(this.rootURL+'/bookings_info', formData);
  }

  refreshList() {
    this.http.get(this.rootURL + '/bookings_info')
    .toPromise()
    .then(res => this.list = res as BookingsInfo[]);
  }
}
