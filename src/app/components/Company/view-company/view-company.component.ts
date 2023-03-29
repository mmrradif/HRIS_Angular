
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/Company/company';
import { CompanyService } from 'src/app/services/Company/company.service';
import { MessageService } from 'src/app/services/Message/message.service';
import { ConfirmDialogComponent } from '../../Shared/confirm-dialog/confirm-dialog.component';
import { CompanyCreateComponent } from '../create-company/create-company.component';
import { DetailsCompanyComponent } from '../details-company/details-company.component';
import { EditCompanyComponent } from '../edit-company/edit-company.component';




@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class CompanyViewComponent {
  companies: Company[] = [];
  dataSource: MatTableDataSource<Company> = new MatTableDataSource(this.companies);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["name", "alias", "address", "phone", "email", "actions"];

  constructor(
    private dataSvc: CompanyService,
    private notifySvc: MessageService,
    private dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public company: Company // Retrieve the company object from the data property

  ) { }

  ngOnInit(): void {
    this.dataSvc.getCompanies().
      subscribe(x => {
        this.companies = x;
        console.log(x);
        this.dataSource.data = this.companies;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load company data", "DISMISS");
      })
  }


  confirmDelete(item: Company) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.dataSvc.deleteCompany(Number(item.companyId))
        .subscribe(x => {
          this.notifySvc.success("Data deleted successfully!!", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.companyId != x.companyId);
        }, err => {
          this.notifySvc.fail("Data deleted Successfully!!!", "DISMISS");
          this.dataSvc.getCompanies().
          subscribe(x => {
            this.companies = x;
            console.log(x);
            this.dataSource.data = this.companies;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, err => {
            this.notifySvc.fail("Failed to load company data", "DISMISS");
          })
        });
    });
  }

  showDetails(company: any) {
    this.router.navigate(['/companydetails', company.id]);
  }

  companyCreate() {
    const dialogRef = this.dialog.open(CompanyCreateComponent, {
      width: '450px',
      maxHeight: '90vh',
      minWidth: '50vw',     
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) { // Check if a new company was created
        this.companies.push(result); // Add the new company to the data array
        this.dataSource.data = [...this.companies]; // Refresh the data source
      }
    });
  }

  
  companyUpdate(company: Company) {
    const dialogRef = this.dialog.open(EditCompanyComponent, {
      width: '450px',
      maxHeight: '90vh',
      minWidth: '50vw',
      data: company // Pass the company object to the dialog component
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) { // Check if the company was updated
        const index = this.companies.findIndex(c => c.companyId === result.companyId); // Find the index of the updated company
        this.companies[index] = result; // Update the company in the data array
        this.dataSource.data = [...this.companies]; // Refresh the data source
      }
    });
  }
  

  // openDetailsDialog(id: number) {
  //   const dialogRef = this.dialog.open(DetailsCompanyComponent, {
  //     data: { id: id }
  //   });
  // }


  openDetailsCompanyDialog(id: number) {
    this.dialog.open(DetailsCompanyComponent, {
      width: '450px',
      minWidth: '70vw',
      maxHeight:'100vh',
      data: { id: id }
    });
  }
  
  
}






  


 