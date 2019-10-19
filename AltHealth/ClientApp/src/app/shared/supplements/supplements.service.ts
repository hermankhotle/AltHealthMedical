import { Injectable } from '@angular/core';
import { supplements } from './supplements.model';
import { HttpClient } from '@angular/common/http';
import {Chart} from 'chart.js'


@Injectable({
  providedIn: 'root'
})
export class SupplementsService {
  formData:supplements;
  readonly rootURL = 'http://localhost:61642/api';
  list: supplements[];

  constructor(private http: HttpClient) { }

  register(formData : supplements){
    return this.http.get(this.rootURL+'/supplements');
  }

  refreshList() {
    this.http.get(this.rootURL + '/supplements')
    .toPromise()
    .then(res => this.list = res as supplements[]);
  }

  getStock() {
    return this.http.get(this.rootURL+'/supplements');
  }

  getSuppl() {
    return this.http.get(this.rootURL+'/supplements').toPromise();
  }
}
