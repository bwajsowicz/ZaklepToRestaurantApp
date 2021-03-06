import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// TODO: organize imports 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { DashboardComponent} from './interface/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule,  } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AuthGuard } from './services/auth-guard';
import { ReservationsComponent } from './interface/reservations/reservations.component';
import { InterfaceComponent } from './interface/interface.component';
import { AccountComponent } from './interface/account/account.component';
import { DataHandlerService } from 'src/app/services/data-handler.service';
import { EmployeeService } from './services/employee.service';
import { ConfirmDialog } from './interface/shared/dialogs/confirm-dialog.component';
import { UpdateDialog } from './interface/shared/dialogs/update-dialog.component';
import { ConfirmSnack } from './interface/shared/snacks/confirm-snack.component';
import { RemoveSnack } from './interface/shared/snacks/remove-snack.component';
import { UpdateSnack } from './interface/shared/snacks/update-snack.components';
import { TableViewComponent } from './interface/table-view/table-view.component';
import { EmployeesComponent } from './interface/employees/employees.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { SettingsComponent } from './interface/settings.component'; 
import { PhonePipe } from './interface/shared/pipes/phone.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ReservationsComponent,
    InterfaceComponent,
    AccountComponent,
    ConfirmDialog,
    UpdateDialog,
    ConfirmSnack,
    RemoveSnack,
    UpdateSnack,
    TableViewComponent,
    EmployeesComponent,
    SettingsComponent,
    PhonePipe
  ],
  entryComponents: [ConfirmDialog, UpdateDialog, ConfirmSnack, RemoveSnack, UpdateSnack],
  imports: [
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},     
      {path: 'interface', canActivate: [AuthGuard], component: InterfaceComponent, children: [
        {
          path: 'dashboard',
          component: DashboardComponent,
        },
        {
          path: 'reservations',
          component: ReservationsComponent,
        },
        {
          path: 'table-view',
          component: TableViewComponent,
        },
        {
          path: 'employees',
          component: EmployeesComponent,
        },
        {
          path: 'account',
          component: AccountComponent,
        },
        {
          path: 'settings',
          component: SettingsComponent,
        },
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'}  ]},
      {path: '', redirectTo: 'login', pathMatch: 'full'}
    ]),
    [BrowserAnimationsModule],
    [MatProgressBarModule, MatNativeDateModule, MatProgressSpinnerModule, 
     MatListModule, MatIconModule, MatSidenavModule, MatCardModule,
     MatInputModule, MatButtonModule, MatBadgeModule, MatToolbarModule, 
     MatFormFieldModule, MatDatepickerModule, MatSnackBarModule,
     MatDialogModule],
    BrowserModule
  ],
  providers: [DataHandlerService, AuthGuard, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
