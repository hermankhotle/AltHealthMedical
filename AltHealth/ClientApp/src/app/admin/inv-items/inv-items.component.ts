import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { InvItems } from 'src/app/shared/invItems/invItems.model';
import { InvItemsService } from 'src/app/shared/invItems/inv-items.service';
import { supplements } from 'src/app/shared/supplements/supplements.model';
import { SupplementsService } from 'src/app/shared/supplements/supplements.service';
import { NgForm } from '@angular/forms';
import { OrdersService } from 'src/app/shared/orders/orders.service';

@Component({
  selector: 'app-inv-items',
  templateUrl: './inv-items.component.html',
  styleUrls: ['./inv-items.component.css']
})
export class InvItemsComponent implements OnInit {
formData: InvItems ;
itemList: supplements[];
  constructor(
    @Inject (MAT_DIALOG_DATA) public data,
    public dialogRef : MatDialogRef<InvItemsComponent>,
    private service : InvItemsService, private serviceSuppl : SupplementsService,
    private orderService: OrdersService
  ) { }

  ngOnInit() {
    this.serviceSuppl.getSuppl().then(res => this.itemList = res as supplements[]);
    if (this.data.invItemsIndex == null)
    this.formData = {
      InvID: this.data.InvID,
      InvItemID: null,
      Suppl_id: '',
      Quantity: null,
      Supplement: '',
      Price: null,
      Total: null
    }
    else
    this.formData = Object.assign({}, this.orderService.invItems[this.data.invItemsIndex]);
  }

  updatePrice(ctrl) {
    if(ctrl.selectedIndex ==0) {
      this.formData.Price = 0;
    }
    else {
      this.formData.Price = this.itemList[ctrl.selectedIndex-1].Cost_client;
    }
    this.updateTotal();
  }

  updateTotal() {
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }

  onSubmit(form:NgForm){
    if (this.data.invItemsIndex == null)
    this.orderService.invItems.push(form.value);
    else
    this.orderService.invItems[this.data.invItemsIndex] = form.value;
    this.dialogRef.close();
  }
}
