import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/orders/orders.service';
import { NgForm } from '@angular/forms';
import { isDate } from 'util';
import { InvoicePopupComponent } from '../invoice-info/invoice-popup/invoice-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { InvItemsComponent } from '../inv-items/inv-items.component';
import { ClientService } from 'src/app/shared/clients/client.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceInfoService } from 'src/app/shared/invoice-info/invoice-info.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  

  constructor(private service : OrdersService,
    private dialog : MatDialog,
    private serviceClient: ClientService,
    private serviceInfo : InvoiceInfoService,
    private toastr: ToastrService,
    private router: Router,
    private currentRouter: ActivatedRoute) { }

  ngOnInit() {
    let invoiceID = this.currentRouter.snapshot.paramMap.get('id');
    if(invoiceID == null)
    this.resetForm();
    else {
      this.service.getInvoiceById(parseInt(invoiceID)).then(res => {
        this.service.formData = res.invoice;
        this.service.invItems = res.invoiceDetails;
      });
    }

    this.serviceClient.refreshList();
  }

  resetForm(form?: NgForm) {
    if(form != null)
    form.resetForm();
    this.service.formData = {
      InvID : 0,
      INVNum : '',
      INVDate: Date[0],
      Client_id : 0,
      Consultation: null,
      TotalSupplements : null,
      TotalSupplConsultation : null,
    };
    this.service.invItems= [];
 }

 AddOrEditInvItems(invItemsIndex,InvID) {
  const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {invItemsIndex, InvID};
    this.dialog.open(InvItemsComponent, dialogConfig).afterClosed().subscribe( res => {
      this.updateSupplementTotal();
    });
 }

 onDeleteInvItems(InvID: number, i : number) {
    this.service.invItems.splice(i,1);
    this.updateSupplementTotal();
 }

 updateSupplementTotal() {
   this.service.formData.TotalSupplements = this.service.invItems.reduce((prev, curr) => {
     return prev + curr.Total;
   }, 0);
   this.service.formData.TotalSupplements = parseFloat(this.service.formData.TotalSupplements.toFixed(2));
   this.updateSupplConsulTotal();
 }

 updateSupplConsulTotal() {
  this.service.formData.TotalSupplConsultation = parseFloat((this.service.formData.Consultation + this.service.formData.TotalSupplements).toFixed(2));
}

onSubmit(form:NgForm) {
  this.service.register(form.value).subscribe(
    res => {
      this.resetForm(form);
      this.toastr.success('Submitted successfully', 'Invoice');
      this.router.navigate(['/invoice-info'])
    },
    err => {
      console.log(err);
    }
  )
}
}
