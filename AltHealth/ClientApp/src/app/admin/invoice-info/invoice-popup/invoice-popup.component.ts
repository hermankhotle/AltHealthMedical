import { Component, OnInit, Inject } from '@angular/core';
import { InvoiceInfoService } from 'src/app/shared/invoice-info/invoice-info.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientsPopupComponent } from '../../clients/clients-popup/clients-popup.component';
import { NgForm } from '@angular/forms';
import { InvoiceInfo } from 'src/app/shared/invoice-info/invoice-info.model';

@Component({
  selector: 'app-invoice-popup',
  templateUrl: './invoice-popup.component.html',
  styles: []
})
export class InvoicePopupComponent implements OnInit {

   formData : InvoiceInfo
  constructor(private service: InvoiceInfoService, private dialog : MatDialog,
    private router: Router, private toastr: ToastrService, 
    @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<InvoicePopupComponent>) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(this.data.invoiceIndex == null)
    this.formData = {
      InvID : 0,
      INVNum : '',
      INVDate: Date[0],
      Client_id : 0,
      Consultation: null,
      TotalSupplements : null,
      TotalSupplConsultation : null,
    };
    this.service.list= [];
 }

  onSubmit(form:NgForm) {
    this.service.register(form.value).subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Course Register');
      },
      err => {
        console.log(err);
      }
    )
  }

}
