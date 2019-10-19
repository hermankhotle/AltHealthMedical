import { Component, OnInit, Inject } from '@angular/core';
import { supplements } from 'src/app/shared/supplements/supplements.model';
import { SupplementsService } from 'src/app/shared/supplements/supplements.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-supplements-popup',
  templateUrl: './supplements-popup.component.html',
  styles: []
})
export class SupplementsPopupComponent implements OnInit {
  formData : supplements;
  constructor(private service: SupplementsService, private dialog : MatDialog,
    private router: Router, private toastr: ToastrService, 
    @Inject(MAT_DIALOG_DATA) public data, 
    public dialogRef: MatDialogRef<SupplementsPopupComponent>) { }

  ngOnInit()
   {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    this.service.refreshList();
    if(this.data.supplementIndex == null)
    this.formData = {
      Suppl_id : '',
      Description : '',
      Cost_excl : '',
      Cost_incl : '',
      Perc_inc : '',
      Cost_client : null,
      Supplier_id : '',
      Min_levels : null,
      Stock_levels : null,
      Nappi_code : null,
    }
    else{
      this.formData = Object.assign({}, this.service.list[this.data.supplementIndex]);
    }
  }

  onSubmit(form:NgForm) {
    this.service.register(form.value).subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Supplements');
        this.dialogRef.close();
      },
      err => {
        console.log(err);
      }
    )
  }

}
