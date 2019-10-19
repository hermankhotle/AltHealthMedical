import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InvoiceInfo } from './invoice-info.model';
import { InvItems } from '../invItems/invItems.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceInfoService {
  formData: InvoiceInfo;
  // invItems: InvItems[];
  readonly rootURL = 'http://localhost:61642/api';
  list: InvoiceInfo[];
  // invItems: InvItems[];

  constructor(private http: HttpClient) { }

  register(formData : InvoiceInfo){
    return this.http.post(this.rootURL+'/InvoiceInfo', formData);
  }

  refreshList() {
    this.http.get(this.rootURL + '/InvoiceInfo')
    .toPromise()
    .then(res => this.list = res as InvoiceInfo[]);
  }

}
