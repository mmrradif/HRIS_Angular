import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/Company/company';
import { CompanyService } from 'src/app/services/Company/company.service';
import { MessageService } from 'src/app/services/Message/message.service';



@Component({
  selector: 'app-details-company',
  templateUrl: './details-company.component.html',
  styleUrls: ['./details-company.component.css'],
  
  animations: [
    // Define the animation configuration for @dialogAnimation
    trigger('dialogAnimation', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class DetailsCompanyComponent {

 
  
  company!:Company;

  constructor(
    private companyService: CompanyService,
    private notifyService: MessageService,
    private activatedroute:ActivatedRoute,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<DetailsCompanyComponent>,
  
  ){}


  ngOnInit(): void { 
    
    this.companyService.getCompanyById(this.data.id).subscribe(
      company => this.company = company,
      error => this.notifyService.fail('Failed to load data', 'DISMISS')
    );
    
    // let id: number = this.activatedroute.snapshot.params['id'];
    // console.log('id:', id);
    // this.companyService.getCompanyById(id).subscribe(
    //   x => {
    //     this.company = x;
    //   },
    //   err => {
    //     this.notifyService.fail("Failed to load data", "DISMISS");
    //   }
    // );
  }

  goToList() {
    this.router.navigate(['/companyview']);
  }
  
  onInsert() {
    this.router.navigate(['/companycreate']);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
