
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; //-- For Validations
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatModule } from './Modules/Mat/mat/mat.module';
import { CompanyCreateComponent } from './components/Company/create-company/create-company.component';
import { CompanyViewComponent } from './components/Company/view-company/view-company.component';
import { ConfirmDialogComponent } from './components/Shared/confirm-dialog/confirm-dialog.component';


import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { DetailsCompanyComponent } from './components/Company/details-company/details-company.component';
import { EditCompanyComponent } from './components/Company/edit-company/edit-company.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from './components/Shared/navbar/navbar.component';
import { CompanyDetailsDialogComponent } from './compontens/Company/company-details-dialog/company-details-dialog.component';


@NgModule({
declarations: [
AppComponent,
LoginComponent,
SignupComponent,
DashboardComponent,
CompanyCreateComponent,
ConfirmDialogComponent,
CompanyViewComponent,
DetailsCompanyComponent,
EditCompanyComponent,
NavbarComponent,
CompanyDetailsDialogComponent

],
imports: [
BrowserModule,
AppRoutingModule,
ReactiveFormsModule,
HttpClientModule,
BrowserAnimationsModule,
MatInputModule,
MatButtonModule,
MatSnackBarModule,
MatToolbarModule,
MatIconModule,
MatFormFieldModule,
MatSelectModule,
MatDatepickerModule,
MatNativeDateModule,
MatDialogModule,
MatModule,
MatPaginatorModule,
MatTableModule,
MatCardModule, 
MatSidenavModule


],
providers: [  AuthService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
bootstrap: [AppComponent]
})
export class AppModule { }