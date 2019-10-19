import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/shared/appointment/appointment.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { AppointmentPopupComponent } from './appointment-popup/appointment-popup.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  constructor(private router: Router, private service: AppointmentService,
        private dialog : MatDialog) { }

  ngOnInit() {
    this.service.refreshList();
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  onCreate(appointmentIndex, ID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {appointmentIndex, ID};
    this.dialog.open(AppointmentPopupComponent, dialogConfig);
  }
}
