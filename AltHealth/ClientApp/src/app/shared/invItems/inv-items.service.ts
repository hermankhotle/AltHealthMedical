import { Injectable } from '@angular/core';
import { Orders } from '../orders/orders.model';
import { InvItems } from './invItems.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvItemsService {
  formData: Orders;
  invItems: InvItems[];
  readonly rootURL = 'http://localhost:61642/api';
  list: Orders[];

  constructor(private http: HttpClient) { }

  register(formData : Orders){
    return this.http.post(this.rootURL+'/InvoiceInfo', formData);
  }

  refreshList() {
    this.http.get(this.rootURL + '/InvoiceInfo')
    .toPromise()
    .then(res => this.list = res as Orders[]);
  }
}
