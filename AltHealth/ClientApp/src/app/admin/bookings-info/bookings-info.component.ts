import { Component, OnInit } from '@angular/core';
import { BookingsInfoService } from 'src/app/shared/booking-info/bookings-info.service';
import { BookingPopupComponent } from './booking-popup/booking-popup.component';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClientService } from 'src/app/shared/clients/client.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bookings-info',
  templateUrl: './bookings-info.component.html',
  styleUrls: ['./bookings-info.component.css']
})
export class BookingsInfoComponent implements OnInit {

  constructor(private router: Router, private service: BookingsInfoService,
    private dialog : MatDialog, private clientService : ClientService) { }

ngOnInit() {
this.service.refreshList();
this.resetForm();
}
resetForm(form?: NgForm) {
  if(form != null)
  form.resetForm();
  this.service.formData = {
  ID : null,
 Appointment_Date : Date[0],
 Client_id : '',
 C_name: '',
 Time : '',
  }
}
onLogout(){
localStorage.removeItem('token');
this.router.navigate(['/signin']);
}

onCreate(bookinginfoIndex, ID) {
const dialogConfig = new MatDialogConfig();
dialogConfig.autoFocus = true;
dialogConfig.disableClose = true;
dialogConfig.width = "50%";
dialogConfig.data = {bookinginfoIndex, ID};
this.dialog.open(BookingPopupComponent, dialogConfig);
}
}
