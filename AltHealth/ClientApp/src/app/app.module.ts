import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon'
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { ChartsModule } from 'ng2-charts';
import {NgxPaginationModule} from 'ngx-pagination';
 
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppointmentsComponent } from './admin/appointments/appointments.component';
import { SupplementsComponent } from './admin/supplements/supplements.component';
import { SigninComponent } from './login/signin/signin.component';
import { SignupComponent } from './login/signup/signup.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthGuard } from './auth/auth.guard';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MyAppointmentsComponent } from './admin/my-appointments/my-appointments.component';
import { AppointmentPopupComponent } from './admin/appointments/appointment-popup/appointment-popup.component';
import { SupplementsPopupComponent } from './admin/supplements/supplements-popup/supplements-popup.component';

import { ClientsComponent } from './admin/clients/clients.component';
import { InvoiceInfoComponent } from './admin/invoice-info/invoice-info.component';
import { BookingsInfoComponent } from './admin/bookings-info/bookings-info.component';
import { ClientsPopupComponent } from './admin/clients/clients-popup/clients-popup.component';
import { BookingPopupComponent } from './admin/bookings-info/booking-popup/booking-popup.component';
import { MatTableModule } from '@angular/material';
import { InvoicePopupComponent } from './admin/invoice-info/invoice-popup/invoice-popup.component';
import { OrderComponent } from './admin/order/order.component';
import { InvItemsComponent } from './admin/inv-items/inv-items.component';
import { LinechartComponent } from './admin/dashboard/linechart/linechart.component';
import { BarchartComponent } from './admin/dashboard/barchart/barchart.component';
import { DoughnutchartComponent } from './admin/dashboard/doughnutchart/doughnutchart.component';
import { PiechartComponent } from './admin/dashboard/piechart/piechart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    AppointmentsComponent,
    SupplementsComponent,
    SigninComponent,
    SignupComponent,
    SidebarComponent,
    PopupModalComponent,
    DashboardComponent,
    MyAppointmentsComponent,
    AppointmentPopupComponent,
    SupplementsPopupComponent,
    ClientsComponent,
    InvoiceInfoComponent,
    BookingsInfoComponent,
    ClientsPopupComponent,
    BookingPopupComponent,
    InvoicePopupComponent,
    OrderComponent,
    InvItemsComponent,
    LinechartComponent,
    BarchartComponent,
    DoughnutchartComponent,
    PiechartComponent,
  ],
  imports: [
    BrowserAnimationsModule, // required animations module
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ChartsModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(), 
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    RouterModule.forRoot([
      { path: '', component: SigninComponent, pathMatch: 'full'},
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
        { path: 'edit/:id', component: HomeComponent}
      ] },
      { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard]},
      { path: 'bookings-info', component: BookingsInfoComponent, canActivate: [AuthGuard]},
      { path: 'invoice-info', component: InvoiceInfoComponent, canActivate: [AuthGuard]},
      { path: 'supplements', component: SupplementsComponent, canActivate: [AuthGuard]}
    ])
  ],
  entryComponents: [  SupplementsPopupComponent, ClientsPopupComponent, BookingPopupComponent,
  InvoicePopupComponent, InvItemsComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
