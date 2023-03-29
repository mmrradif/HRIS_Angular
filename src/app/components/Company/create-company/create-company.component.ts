import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/Company/company';
import { CompanyService } from 'src/app/services/Company/company.service';
import { MessageService } from 'src/app/services/Message/message.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CompanyCreateComponent implements OnInit {
  companies: Company[] = [];
  dataSource: MatTableDataSource<Company> = new MatTableDataSource(this.companies);
  company: Company = new Company();
  companyForm: FormGroup = new FormGroup({
    companyName: new FormControl('', Validators.required),
    companyAlias: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    fax: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl('', Validators.required),
    companyRegisterNo: new FormControl('', Validators.required),
    isActive: new FormControl('', Validators.required),
    createBy: new FormControl('', Validators.required),
    createDate: new FormControl('', Validators.required),
    updateBy: new FormControl('', Validators.required),
    updateDate: new FormControl('', Validators.required),
  });

  constructor(
    private companySvc: CompanyService,
    private notifySvc: MessageService,
    private router: Router,
    private dialogRef: MatDialogRef<CompanyCreateComponent>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Manually detect changes after view has rendered
    setTimeout(() => {
      this.dataSource.data = this.companies;
      this.cdr.detectChanges();
    });
  }

  f() {
    return this.companyForm.controls;
  }

  insert() {
    if (this.companyForm.invalid) return;
    this.company.companyName = this.f()['companyName'].value;
    this.company.companyAlias = this.f()['companyAlias'].value;
    this.company.address = this.f()['address'].value;
    this.company.phone = this.f()['phone'].value;
    this.company.fax = this.f()['fax'].value;
    this.company.email = this.f()['email'].value;
    this.company.website = this.f()['website'].value;
    this.company.companyRegisterNo = this.f()['companyRegisterNo'].value;
    this.company.isActive = this.f()['isActive'].value;
    this.company.createBy = this.f()['createBy'].value;
    this.company.createDate = this.f()['createDate'].value;
    this.company.updateBy = this.f()['updateBy'].value;
    this.company.updateDate = this.f()['updateDate'].value;
    this.companySvc.createCompany(this.company).subscribe(
      (r) => {
        this.notifySvc.success('Data saved successfully!!!', 'DISMISS');
        this.companyForm.reset({});
        console.log(r);
        this.dialogRef.close(this.company);
      },
      (err) => {
        this.notifySvc.fail('Failed to save data!!!', 'DISMISS');
      }
    );
  }

  resetForm() {
    this.companyForm.reset();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}























// import { ChangeDetectorRef, Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef } from '@angular/material/dialog';
// import { MatTableDataSource } from '@angular/material/table';
// import { Router } from '@angular/router';
// import { Company } from 'src/app/models/Company/company';
// import { CompanyService } from 'src/app/services/Company/company.service';
// import { MessageService } from 'src/app/services/Message/message.service';




// @Component({
//   selector: 'app-create-company',
//   templateUrl: './create-company.component.html',
//   styleUrls: ['./create-company.component.css']
// })
// export class CompanyCreateComponent {

//   companies: Company[] = [];
//   dataSource: MatTableDataSource<Company> = new MatTableDataSource(this.companies);
//     company: Company = new Company();
//     companyForm: FormGroup = new FormGroup({
//     companyName: new FormControl('', Validators.required),
//     companyAlias: new FormControl('', Validators.required),
//     address: new FormControl('', Validators.required),
//     phone: new FormControl('', Validators.required),
//     fax: new FormControl('', Validators.required),
//     email: new FormControl('', [Validators.required, Validators.email]),
//     website: new FormControl('', Validators.required),
//     companyRegisterNo: new FormControl('', Validators.required),
//     isActive: new FormControl('', Validators.required),
//     createBy: new FormControl('', Validators.required),
//     createDate: new FormControl('', Validators.required),
//     updateBy: new FormControl('', Validators.required),
//     updateDate: new FormControl('', Validators.required),
//   });


// constructor(
//   private companySvc: CompanyService,
//   private notifySvc: MessageService,
//   private router: Router,
//   private dialogRef: MatDialogRef<CompanyCreateComponent>,
//   private cdr: ChangeDetectorRef
// ) { }

// f() {
// return this.companyForm.controls;
// }

// insert() {
//   if (this.companyForm.invalid) return;
//   this.company.companyName = this.f()['companyName'].value;
//   this.company.companyAlias = this.f()['companyAlias'].value;
//   this.company.address = this.f()['address'].value;
//   this.company.phone = this.f()['phone'].value;
//   this.company.fax = this.f()['fax'].value;
//   this.company.email = this.f()['email'].value;
//   this.company.website = this.f()['website'].value;
//   this.company.companyRegisterNo = this.f()['companyRegisterNo'].value;
//   this.company.isActive = this.f()['isActive'].value;
//   this.company.createBy = this.f()['createBy'].value;
//   this.company.createDate = this.f()['createDate'].value;
//   this.company.updateBy = this.f()['updateBy'].value;
//   this.company.updateDate = this.f()['updateDate'].value;
//   this.companySvc.createCompany(this.company)
//     .subscribe(r => {
//       this.notifySvc.success("Data saved successfully!!!", "DISMISS");
//       this.companyForm.reset({});
//       console.log(r);
//       this.dialogRef.close(this.company);
//     }, err => {
//       this.notifySvc.fail("Failed to save data!!!", "DISMISS");
//     })
//   }


//   resetForm() {
//     this.companyForm.reset();
//   }

//   // goToList() {
//   //   this.router.navigate(['/companyview']);
//   // }

//   onClose(): void {
//     this.dialogRef.close();
//   }


 
 

// }


