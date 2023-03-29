
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/Company/company';
import { CompanyService } from 'src/app/services/Company/company.service';
import { MessageService } from 'src/app/services/Message/message.service';



@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})

export class EditCompanyComponent {


  company!:Company;
  companyForm:FormGroup = new FormGroup({
    companyName: new FormControl('', Validators.required),
    companyAlias: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone:new FormControl('', Validators.required),
    fax:new FormControl('', Validators.required),
    email:new FormControl('', Validators.required),
    website:new FormControl('', Validators.required),
    companyRegisterNo:new FormControl('', Validators.required),
    isActive:new FormControl('', Validators.required),
    updateBy:new FormControl('', Validators.required)
  });

  constructor(
    private dataservice : CompanyService,
    private notifyservice: MessageService,
    private activatedroute:ActivatedRoute,
    public dialogRef: MatDialogRef<EditCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company
  ){}

  f(){
    return this.companyForm.controls;
  }

  // update(){
  //   if(this.companyForm.invalid) return;
  //   this.company.companyName = this.f()['companyName'].value;
  //   this.company.companyAlias = this.f()['companyAlias'].value;
  //   this.company.address=this.f()['address'].value;
  //   this.company.phone=this.f()['phone'].value;
  //   this.company.fax=this.f()['fax'].value;
  //   this.company.email=this.f()['email'].value;
  //   this.company.website=this.f()['website'].value;
  //   this.company.companyRegisterNo=this.f()['companyRegisterNo'].value;
  //   this.company.isActive=this.f()['isActive'].value;
  //   this.company.updateBy=this.f()['updateBy'].value;

  //   this.dataservice.updateData(this.company).subscribe(x=>{
  //     this.notifyservice.success("Data updated successfully","DISMISS");
  //   },
  //   err=>{
  //     this.notifyservice.fail("Failed to update data","DISMISS");
  //   }
  //   );
  // }


  update(company: Company) {
    if (!company) {
      return;
    }
    if(this.companyForm.invalid) return;
    company.companyName = this.f()['companyName'].value;
    company.companyAlias = this.f()['companyAlias'].value;
    company.address=this.f()['address'].value;
    company.phone=this.f()['phone'].value;
    company.fax=this.f()['fax'].value;
    company.email=this.f()['email'].value;
    company.website=this.f()['website'].value;
    company.companyRegisterNo=this.f()['companyRegisterNo'].value;
    company.isActive=this.f()['isActive'].value;
    company.updateBy=this.f()['updateBy'].value;
  
    this.dataservice.updateData(company).subscribe(x=>{
      this.notifyservice.success("Data updated successfully","DISMISS");
    },
    err=>{
      this.notifyservice.fail("Failed to update data","DISMISS");
    });
  }
  
  

  ngOnInit():void{

    this.companyForm.patchValue(this.data); // Use the data object to pre-populate the form fields
    // let id: number = this.activatedroute.snapshot.params['id'];
    // this.dataservice.getCompanyById(id).subscribe(x=>{
    //   this.company = x;
    //   this.companyForm.patchValue(this.company);
    // },
    // err=>{
    //   this.notifyservice.fail("Failed to load data","DISMISS");
    // });
  }


  onClose(): void {
    this.dialogRef.close();
  }
  
}







