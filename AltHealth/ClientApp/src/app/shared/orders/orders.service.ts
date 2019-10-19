import { Injectable } from '@angular/core';
import { Orders } from './orders.model';
import { InvItems } from '../invItems/invItems.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  formData: Orders;
  invItems: InvItems[];
  readonly rootURL = 'http://localhost:61642/api';
  list: Orders[];

  constructor(private http: HttpClient) { }

  register(formData : Orders){
    var body = {
      ...this.formData,
      InvoiceItems: this.invItems
    };
    return this.http.post(this.rootURL+'/InvoiceInfo', body);
  }

  refreshList() {
    this.http.get(this.rootURL + '/InvoiceInfo')
    .toPromise()
    .then(res => this.list = res as Orders[]);
  }

  getInvoiceById(id : number): any {
    this.http.get(this.rootURL + '/InvoiceInfo/'+ id).toPromise()
  }
}
