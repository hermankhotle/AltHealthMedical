import { Component, OnInit } from '@angular/core';
import { SupplementsService } from 'src/app/shared/supplements/supplements.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SupplementsPopupComponent } from './supplements-popup/supplements-popup.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-supplements',
  templateUrl: './supplements.component.html',
  styleUrls: ['./supplements.component.css']
})
export class SupplementsComponent implements OnInit {

  constructor( private service: SupplementsService, private router : Router
    , private dialog : MatDialog) { }

  ngOnInit() {
    this.service.refreshList();
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(form != null)
    form.resetForm();
    this.service.formData = {
      Suppl_id : '',
      Description : '',
      Cost_excl : '',
      Cost_incl : '',
      Perc_inc : '',
      Cost_client : 0,
      Supplier_id : '',
      Min_levels : 0,
      Stock_levels : 0,
      Nappi_code : '',
    }
 }
  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  onCreate(supplementIndex, Suppl_id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {supplementIndex, Suppl_id};
    this.dialog.open(SupplementsPopupComponent, dialogConfig);
  }
  p: number = 1;

}
