import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule, MatDialogConfig, MatDialog } from '@angular/material';
import { InvoiceInfoService } from 'src/app/shared/invoice-info/invoice-info.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoicePopupComponent } from './invoice-popup/invoice-popup.component';
import { NgForm } from '@angular/forms';
import { OrdersService } from 'src/app/shared/orders/orders.service';

@Component({
  selector: 'app-invoice-info',
  templateUrl: './invoice-info.component.html',
  styleUrls: ['./invoice-info.component.css']
})
export class InvoiceInfoComponent implements OnInit {
  invoiceList;
  constructor(private service: OrdersService, 
    private router: Router, 
    private dialog : MatDialog,
    private currentRoute : ActivatedRoute) { }
  
  ngOnInit() {
    this.service.refreshList();
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
  openOrEdit(InvID: number) {
    this.router.navigate(['/home/edit/' + InvID]);
  }
}
