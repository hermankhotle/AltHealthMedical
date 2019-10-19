import { Injectable, Optional, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Clients } from './clients.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  formData:Clients;
  readonly rootURL = 'http://localhost:61642/api';
  list: Clients[];

  constructor(private http: HttpClient) { }

  register(formData : Clients){
    return this.http.post(this.rootURL+'/ClientData', formData);
  }

  refreshList() {
    this.http.get(this.rootURL + '/ClientData')
    .toPromise()
    .then(res => this.list = res as Clients[]);
  }

  getClient() : Observable<Clients[]> 
  {
    return this.http.get<Clients[]>(this.rootURL);
  }
}
