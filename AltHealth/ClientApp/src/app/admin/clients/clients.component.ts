import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from 'src/app/shared/clients/client.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientsPopupComponent } from './clients-popup/clients-popup.component';
import { MatTableDataSource } from '@angular/material';
import { NgForm } from '@angular/forms';
// import { Observable} from 'rxjs/Observable';
import { DataSource} from '@angular/cdk/collections'
import { Observable } from 'rxjs';
import { Clients } from 'src/app/shared/clients/clients.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(private service: ClientService, private dialog : MatDialog,
    private router: Router,) { }

  ngOnInit() {
    this.service.refreshList();
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if(form != null)
    form.resetForm();
    this.service.formData = {
    Id : null,
    ClientName : '',
    ClientSurname : '',
    Client_id : '',
    Address : '',
    Code : '',
    C_Tel_H : '',
    C_Tel_W : '',
    C_Tel_Cell :'',
    C_Email : '',
    C_Reference : '',
    }
 }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
  

  onCreateOrEdit(clientIndex, ID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {clientIndex, ID};
    this.dialog.open(ClientsPopupComponent, dialogConfig);
  }

  p: number = 1;

}


