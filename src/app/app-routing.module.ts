import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyCreateComponent } from './components/Company/create-company/create-company.component';
import { DetailsCompanyComponent } from './components/Company/details-company/details-company.component';
import { EditCompanyComponent } from './components/Company/edit-company/edit-company.component';
import { CompanyViewComponent } from './components/Company/view-company/view-company.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';


// Routing
const routes: Routes = [
  { path: '', component:LoginComponent, pathMatch: 'full' },
  { path:'login', component:LoginComponent}, // never use space here
  { path:'signup', component:SignupComponent},
  { path:'dashboard', component:DashboardComponent,canActivate:[AuthGuard]},
  { path:'companycreate', component:CompanyCreateComponent,canActivate:[AuthGuard]},
  { path:'companyview', component:CompanyViewComponent,canActivate:[AuthGuard]},
  { path:'companydetails/:id', component:DetailsCompanyComponent,canActivate:[AuthGuard]},
  { path: 'companyedit/:id', component: EditCompanyComponent,canActivate:[AuthGuard] },
  
  { path:'**', component:LoginComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
