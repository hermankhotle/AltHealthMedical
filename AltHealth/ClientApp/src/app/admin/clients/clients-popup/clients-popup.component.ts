import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientService } from 'src/app/shared/clients/client.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Clients } from 'src/app/shared/clients/clients.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clients-popup',
  templateUrl: './clients-popup.component.html',
  styles: []
})
export class ClientsPopupComponent implements OnInit {
formData : Clients;
  constructor(private service: ClientService, private dialog : MatDialog,
    private router: Router, private toastr: ToastrService, 
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ClientsPopupComponent>) { }

  ngOnInit()
   {
    this.resetForm();
    
  }

  resetForm(form?: NgForm) {
    this.service.refreshList();
    if(this.data.clientIndex == null)
    this.formData = {
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
    else{
      this.formData = Object.assign({}, this.service.list[this.data.clientIndex]);
    }
  }

  onSubmit(form:NgForm) {
    this.service.register(form.value).subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Client');
        this.dialogRef.close();
      },
      err => {
        console.log(err);
      }
    )
  }
}
